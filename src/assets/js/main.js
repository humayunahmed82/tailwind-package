"use strict";

/*--
    Header Top High
-----------------------------------*/
const headerTopHigh = (selector) => {
	const headerTop = document.querySelector(selector);

	if (headerTop) {
		const headerTopHeight = headerTop.clientHeight;
		const headerHeight = document.querySelector("main");
		headerHeight.style.marginTop = headerTopHeight + "px";
	}
};

headerTopHigh(".header-height");

/*--
    Header Sticky
-----------------------------------*/
const headerSticky = (selector) => {
	const header = document.querySelector(selector);

	if (header) {
		const headerLogo = header.querySelector(".change-logo img");

		window.addEventListener("scroll", () => {
			const currentScroll = window.pageYOffset;

			if (currentScroll > 150) {
				header.classList.add("is-sticky");

				if (headerLogo) {
					headerLogo.src = "./assets/images/logo.svg";
				}
			} else {
				header.classList.remove("is-sticky");

				if (headerLogo) {
					headerLogo.src = "./assets/images/logo-white.svg";
				}
			}
		});
	}
};

headerSticky(".header__main");

// menu-items-list menu-items-list--dark

/*--
    Mobile Menu 

    Global Functions
    - Get Sibling
    - Slide Up
    - Slide Down
    - Slide Toggle
-----------------------------------*/

/* Get Sibling */
const getSiblings = (elem) => {
	const siblings = [];
	let sibling = elem.parentNode.firstChild;

	while (sibling) {
		if (sibling.nodeType === 1 && sibling !== elem) {
			siblings.push(sibling);
		}
		sibling = sibling.nextSibling;
	}
	return siblings;
};

/* Slide Up */
const slideUp = (target, time) => {
	const duration = time ? time : 500;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + "ms";
	target.style.boxSizing = "border-box";
	target.style.height = target.offsetHeight + "px";
	target.offsetHeight;
	target.style.overflow = "hidden";
	target.style.height = 0;
	window.setTimeout(() => {
		target.style.display = "none";
		target.style.removeProperty("height");
		target.style.removeProperty("overflow");
		target.style.removeProperty("transition-duration");
		target.style.removeProperty("transition-property");
	}, duration);
};

/* Slide Down */
const slideDown = (target, time) => {
	const duration = time ? time : 500;
	target.style.removeProperty("display");
	let display = window.getComputedStyle(target).display;
	if (display === "none") display = "block";
	target.style.display = display;
	const height = target.offsetHeight;
	target.style.overflow = "hidden";
	target.style.height = 0;
	target.offsetHeight;
	target.style.boxSizing = "border-box";
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + "ms";
	target.style.height = height + "px";
	window.setTimeout(() => {
		target.style.removeProperty("height");
		target.style.removeProperty("overflow");
		target.style.removeProperty("transition-duration");
		target.style.removeProperty("transition-property");
	}, duration);
};

/* Slide Toggle */
const slideToggle = (target, time) => {
	const duration = time ? time : 500;
	if (window.getComputedStyle(target).display === "none") {
		return slideDown(target, duration);
	} else {
		return slideUp(target, duration);
	}
};

/* Offcanvas/Collapseable Menu */
const offCanvasMenu = (selector) => {
	const offCanvasNav = document.querySelector(selector);

	offCanvasNav.querySelectorAll(".menu-expand").forEach((item) => {
		item.addEventListener("click", (e) => {
			e.preventDefault();
			const parent = item.parentElement.parentElement;

			if (parent.classList.contains("active")) {
				parent.classList.remove("active");

				parent
					.querySelectorAll(".sub-menu, .mega-menu, .children")
					.forEach((subMenu) => {
						subMenu.parentElement.classList.remove("active");
						slideUp(subMenu);
					});
			} else {
				parent.classList.add("active");
				slideDown(item.parentElement.nextElementSibling);

				getSiblings(parent).forEach((item) => {
					item.classList.remove("active");

					item
						.querySelectorAll(".sub-menu, .mega-menu, .children")
						.forEach((subMenu) => {
							subMenu.parentElement.classList.remove("active");
							slideUp(subMenu);
						});
				});
			}
		});
	});
};

offCanvasMenu(".navbar-mobile-menu, .slidedown-menu__menu");
