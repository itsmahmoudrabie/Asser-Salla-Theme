/**
 * Premium header behaviour (src/views/components/header/header-premium.twig):
 *  1. Scroll physics   — shrink 80→60px, transparent→solid bg, hide/reveal via translateY
 *  2. <premium-main-menu> — desktop mega-menu + full-screen mobile overlay, built from
 *                           salla.api.component.getMenus() (same API as main-menu.js)
 *  3. Wishlist badge   — salla.storage('salla::wishlist') + salla.wishlist.event
 *  4. Cart bump        — pulses the cart icon on salla.cart.event.onItemAdded
 *  5. Announcement bar — dismiss + persist in localStorage
 *
 * The search icon needs no JS at all — it dispatches the confirmed real
 * `search::open` event inline (see header-premium.twig), which the sitewide
 * <salla-search> modal already listens for.
 *
 * Dark/light toggling itself is NOT handled here — it reuses the site-wide
 * [data-dark-mode-toggle] handler already wired in app.js (initiateDarkMode),
 * so both headers stay perfectly in sync on the same `aser-color-mode` key.
 */

// ---------------------------------------------------------------------------
// 2. <premium-main-menu> custom element
// ---------------------------------------------------------------------------
class PremiumMainMenu extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="header-premium__menu-skel" aria-hidden="true">
                <span></span><span></span><span></span><span></span><span></span>
            </div>`;
        this.overlay = null;
        this.menus = [];

        salla.onReady()
            .then(() => salla.lang.onLoaded())
            .then(() => salla.api.component.getMenus())
            .then(({ data } = {}) => {
                this.menus = data || [];
                this.render();
                this.bindDesktop();
                this.bindMobile();
            })
            .catch((error) => salla.logger.error('premium-main-menu::Error fetching menus', error));
    }

    disconnectedCallback() {
        this.overlay?.remove();
    }

    hasChildren(menu) {
        return !!(menu && menu.children && menu.children.length);
    }

    hasProducts(menu) {
        return !!(menu && menu.products && menu.products.length);
    }

    renderDesktopItem(menu) {
        const hasChildren = this.hasChildren(menu);
        const hasProducts = this.hasProducts(menu);
        const isMega = hasChildren || hasProducts;
        const classes = ['header-premium__nav-item', isMega ? 'has-mega' : '', hasProducts ? 'mega-wide' : ''].filter(Boolean).join(' ');

        return `
        <li class="${classes}" ${menu.attrs || ''} ${isMega ? 'data-menu-item' : ''}>
            <a class="header-premium__nav-link" href="${menu.url}" ${menu.link_attrs || ''}>
                <span>${menu.title || ''}</span>
                ${isMega ? '<svg class="header-premium__nav-link__caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>' : ''}
            </a>
            ${isMega ? `
            <div class="header-premium__mega">
                ${hasChildren ? `
                <ul class="header-premium__mega-list">
                    ${menu.children.map((child) => `
                    <li><a class="header-premium__mega-link" href="${child.url}" ${child.link_attrs || ''}>${child.title || ''}</a></li>`).join('')}
                </ul>` : ''}
                ${hasProducts ? `<salla-products-list source="selected" shadow-on-hover source-value="[${menu.products}]"></salla-products-list>` : ''}
            </div>` : ''}
        </li>`;
    }

    renderMobileItem(menu, index) {
        const hasChildren = this.hasChildren(menu);
        return `
        <li class="header-premium__mobile-item" data-mobile-item>
            <a class="header-premium__mobile-link" style="--i:${index}" href="${hasChildren ? '#/' : menu.url}"
               ${hasChildren ? 'data-mobile-parent-toggle' : ''} ${menu.link_attrs || ''}>
                <span>${menu.title || ''}</span>
                ${hasChildren ? '<svg class="header-premium__nav-link__caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>' : ''}
            </a>
            ${hasChildren ? `
            <ul class="header-premium__mobile-sub">
                ${menu.children.map((child) => `<li><a class="header-premium__mobile-sub-link" href="${child.url}" ${child.link_attrs || ''}>${child.title || ''}</a></li>`).join('')}
            </ul>` : ''}
        </li>`;
    }

    render() {
        this.innerHTML = `<ul class="header-premium__nav">${this.menus.map((m) => this.renderDesktopItem(m)).join('')}</ul>`;

        // Portal the mobile overlay to <body>: it must stay full-viewport even
        // while #premium-header is translated by the scroll hide/reveal effect
        // (a transformed ancestor becomes the containing block for
        // position:fixed descendants, which would trap/clip an overlay left
        // nested inside the header).
        const overlay = document.createElement('div');
        overlay.className = 'header-premium__mobile-overlay';
        overlay.id = 'premium-mobile-nav'; // matches the burger button's aria-controls
        overlay.innerHTML = `
            <div class="header-premium__mobile-backdrop" data-mobile-backdrop></div>
            <div class="header-premium__mobile-panel" role="dialog" aria-modal="true" aria-label="${this.dataset.menuLabel || ''}">
                <div class="header-premium__mobile-head">
                    <span class="header-premium__wordmark">${this.dataset.storeName || ''}</span>
                    <button type="button" class="header-premium__mobile-close" data-mobile-menu-close aria-label="${this.dataset.closeLabel || ''}">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
                    </button>
                </div>
                <ul class="header-premium__mobile-list">${this.menus.map((m, i) => this.renderMobileItem(m, i)).join('')}</ul>
            </div>`;
        document.body.appendChild(overlay);
        this.overlay = overlay;
    }

    // ---- desktop interactions (click/keyboard on top of the CSS :hover) ---
    bindDesktop() {
        const items = this.querySelectorAll('.header-premium__nav-item[data-menu-item]');

        items.forEach((item) => {
            const trigger = item.querySelector(':scope > .header-premium__nav-link');
            if (!trigger) return;

            trigger.addEventListener('click', (event) => {
                if (window.innerWidth < 768) return; // desktop-only; mobile uses the overlay
                if (!item.classList.contains('has-mega')) return;
                event.preventDefault();
                const willOpen = !item.classList.contains('is-open');
                items.forEach((other) => other.classList.remove('is-open'));
                item.classList.toggle('is-open', willOpen);
            });
        });

        document.addEventListener('click', (event) => {
            if (!this.contains(event.target)) {
                items.forEach((item) => item.classList.remove('is-open'));
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') items.forEach((item) => item.classList.remove('is-open'));
        });
    }

    // ---- mobile full-screen overlay ---------------------------------------
    bindMobile() {
        const toggleBtn = document.querySelector('[data-mobile-menu-toggle]');
        const overlay = this.overlay;
        if (!toggleBtn || !overlay) return;

        const closeBtn = overlay.querySelector('[data-mobile-menu-close]');
        const backdrop = overlay.querySelector('[data-mobile-backdrop]');

        const open = () => {
            overlay.classList.add('is-open');
            toggleBtn.classList.add('is-open');
            toggleBtn.setAttribute('aria-expanded', 'true');
            document.body.classList.add('premium-menu-open');
        };

        const close = () => {
            overlay.classList.remove('is-open');
            toggleBtn.classList.remove('is-open');
            toggleBtn.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('premium-menu-open');
            overlay.querySelectorAll('.header-premium__mobile-item.is-open').forEach((item) => item.classList.remove('is-open'));
        };

        toggleBtn.addEventListener('click', () => (overlay.classList.contains('is-open') ? close() : open()));
        closeBtn?.addEventListener('click', close);
        backdrop?.addEventListener('click', close);
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && overlay.classList.contains('is-open')) close();
        });

        overlay.querySelectorAll('[data-mobile-parent-toggle]').forEach((link) => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                event.currentTarget.closest('[data-mobile-item]')?.classList.toggle('is-open');
            });
        });

        // Plain links inside the overlay should close it before navigating away.
        overlay.querySelectorAll('.header-premium__mobile-link:not([data-mobile-parent-toggle]), .header-premium__mobile-sub-link').forEach((link) => {
            link.addEventListener('click', close);
        });
    }
}

customElements.define('premium-main-menu', PremiumMainMenu);

// ---------------------------------------------------------------------------
// Boot: everything else is plain DOM wiring scoped to the premium header,
// safe to no-op when this header variant isn't the active one.
// ---------------------------------------------------------------------------
salla.onReady(() => {
    const header = document.querySelector('[data-header-premium]');
    if (!header) return; // classic header is active — nothing to do here

    initScrollBehaviour(header);
    initAnnouncementBar();
    initWishlistBadge();
    initCartBump();
});

// ---------------------------------------------------------------------------
// 1. Scroll physics — shrink / hide-reveal (rAF-throttled) + transparent→solid (IntersectionObserver)
// ---------------------------------------------------------------------------
function initScrollBehaviour(header) {
    const SHRINK_AT = 80;   // px scrolled before the header shrinks
    const REVEAL_NEAR_TOP = 120; // always show the header again below this

    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
        const y = window.scrollY;

        header.classList.toggle('is-shrunk', y > SHRINK_AT);

        if (y <= REVEAL_NEAR_TOP) {
            header.classList.remove('is-hidden');
        } else if (y > lastY) {
            header.classList.add('is-hidden');    // scrolling down → hide
        } else if (y < lastY) {
            header.classList.remove('is-hidden');  // scrolling up → reveal
        }

        lastY = y;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
    }, { passive: true });

    // Transparent-over-hero → solid background, driven by IntersectionObserver
    // instead of a scroll-position check (cheaper: no per-frame math needed).
    const sentinel = document.querySelector('[data-scroll-sentinel]');
    if (sentinel && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            ([entry]) => header.classList.toggle('is-solid', !entry.isIntersecting),
            { rootMargin: '-50px 0px 0px 0px', threshold: 0 }
        );
        observer.observe(sentinel);
    } else {
        header.classList.add('is-solid'); // no IO support / no sentinel → always solid, never invisible text
    }
}

// ---------------------------------------------------------------------------
// 5. Announcement bar dismiss (persisted per message, so editing the text
//    in the dashboard makes it reappear even for visitors who dismissed it)
// ---------------------------------------------------------------------------
function initAnnouncementBar() {
    const bar = document.querySelector('[data-announcement-bar]');
    const closeBtn = document.querySelector('[data-announcement-dismiss]');
    if (!bar || !closeBtn) return;

    closeBtn.addEventListener('click', () => {
        bar.classList.add('is-dismissed');
        try {
            localStorage.setItem('aser-announcement-dismissed', bar.dataset.announcementText || '1');
        } catch (e) { /* storage unavailable (private mode / quota) — degrade silently */ }
    });
}

// ---------------------------------------------------------------------------
// 3. Wishlist badge — same storage/events src/assets/js/wishlist.js relies on
// ---------------------------------------------------------------------------
function initWishlistBadge() {
    const badge = document.querySelector('[data-wishlist-count]');
    if (!badge) return;

    const paint = () => {
        const count = (salla.storage.get('salla::wishlist', []) || []).length;
        badge.textContent = count > 99 ? '99+' : String(count);
        badge.hidden = count === 0;
    };

    paint();
    salla.wishlist.event.onAdded(paint);
    salla.wishlist.event.onRemoved(paint);
}

// ---------------------------------------------------------------------------
// 4. Cart icon bump on item added
// ---------------------------------------------------------------------------
function initCartBump() {
    const cartIcon = document.querySelector('[data-cart-icon]');
    if (!cartIcon) return;

    salla.cart.event.onItemAdded(() => {
        cartIcon.classList.remove('is-bumped');
        // force reflow so the animation can be retriggered on consecutive adds
        void cartIcon.offsetWidth;
        cartIcon.classList.add('is-bumped');
    });

    cartIcon.addEventListener('animationend', () => cartIcon.classList.remove('is-bumped'));
}
