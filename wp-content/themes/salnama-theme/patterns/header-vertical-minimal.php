<?php
/**
 * Title: هدر عمودی مینیمال (Vertical Minimal Header)
 * Slug: salnama/header-vertical-minimal
 * Categories: salnama-header
 * Keywords: هدر, عمودی, چسبان, مینیمال, ناوبری
 * Block Types: core/template-part/header
 * Viewport Width: 1280
 */

return [
	'title'       => esc_html__( 'هدر عمودی مینیمال', 'salnama-theme' ),
	'description' => esc_html__( 'یک هدر عمودی چسبان (Sticky) با قابلیت باز شدن و نمایش منوی تمام صفحه.', 'salnama-theme' ),
	'categories'  => [ 'salnama-header' ],
	'content'     => '
<!-- wp:group {"tagName":"header","align":"full","className":"minimal-vertical-header fixed top-0 right-0 h-full w-[8.33%] z-[100] p-6 lg:p-12 transition-all duration-300 ease-in-out is-minimal-header","style":{"spacing":{"padding":{"top":"0","bottom":"0","left":"0","right":"0"}}},"backgroundColor":"surface","layout":{"type":"flex","orientation":"vertical","justifyContent":"flex-start","verticalAlignment":"top"}} -->
<header class="wp-block-group alignfull minimal-vertical-header fixed top-0 right-0 h-full w-[8.33%] z-[100] p-6 lg:p-12 transition-all duration-300 ease-in-out is-minimal-header has-surface-background-color has-background" style="padding-top:0;padding-right:0;padding-bottom:0;padding-left:0"><!-- wp:group {"className":"w-full","style":{"shadow":"var:preset|shadow|none","spacing":{"padding":{"left":"0","right":"0"},"margin":{"top":"0","bottom":"0"},"blockGap":"0"}},"layout":{"type":"flex","orientation":"vertical","justifyContent":"center","verticalAlignment":"bottom"}} -->
<div class="wp-block-group w-full" style="margin-top:0;margin-bottom:0;padding-right:0;padding-left:0;box-shadow:var(--wp--preset--shadow--none)"><!-- wp:group {"className":"p-2 menu-toggle-area cursor-pointer","style":{"spacing":{"padding":{"top":"0","bottom":"0","left":"0","right":"0"},"margin":{"top":"0","bottom":"0"},"blockGap":"0"},"shadow":"var:preset|shadow|none","layout":{"selfStretch":"fit","flexSize":null}},"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"center"}} -->
<div class="wp-block-group p-2 menu-toggle-area cursor-pointer" style="margin-top:0;margin-bottom:0;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0;box-shadow:var(--wp--preset--shadow--none)"><!-- wp:html -->
<div class="rotate-on-hover menu-icon">
  <svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    width="76"
    height="76"
    viewBox="0 0 73.7 73.7"
  >
    <defs>
      <style>
        .st0 {
          fill: none;
          stroke: currentColor; /* استفاده از currentColor */
          stroke-miterlimit: 10;
          stroke-width: 2.5;
        }
        .st1 {
          fill: none;
          stroke: currentColor; /* استفاده از currentColor */
          stroke-miterlimit: 10;
          stroke-width: 2.5;
        }
      </style>
    </defs>
    <!-- خطوط منو -->
    <line class="st0" x1="59.53" y1="48.85" x2="14.17" y2="48.85" />
    <line class="st0" x1="59.53" y1="58.85" x2="14.17" y2="58.85" />
    <line class="st0" x1="59.53" y1="38.85" x2="14.17" y2="38.85" />
    <!-- فلش (برای انیمیشن رفت و برگشت) -->
    <polyline class="st1 arrow-path" points="12.5 15.15 36.82 37.17 61.2 15.11" />
    <!-- دایره دور آیکون -->
    <circle class="st0 circle-path" cx="36.85" cy="36.85" r="35.42" />
  </svg>
</div>
<!-- /wp:html --></div>
<!-- /wp:group --></div>
<!-- /wp:group -->

<!-- wp:group {"className":"action-buttons-container mt-auto w-full flex-grow-1","style":{"spacing":{"blockGap":"0"}},"layout":{"type":"flex","orientation":"vertical","justifyContent":"center","verticalAlignment":"center"}} -->
<div class="wp-block-group action-buttons-container mt-auto w-full flex-grow-1"><!-- wp:group {"className":"action-icons space-y-4","style":{"shadow":"var:preset|shadow|none","border":{"bottom":{"color":"var:preset|color|primary","width":"1px"},"top":[],"right":[],"left":[]},"spacing":{"blockGap":"var:preset|spacing|20"}},"layout":{"type":"flex","orientation":"horizontal","justifyContent":"center","verticalAlignment":"bottom","gap":"var(\u002d\u002dwp\u002d\u002dpreset\u002d\u002dspacing\u002d\u002d40)","flexWrap":"nowrap"}} -->
<div class="wp-block-group action-icons space-y-4" style="border-bottom-color:var(--wp--preset--color--primary);border-bottom-width:1px;box-shadow:var(--wp--preset--shadow--none)"><!-- wp:woocommerce/customer-account {"displayStyle":"icon_only","iconStyle":"line","iconClass":"wc-block-customer-account__account-icon"} /-->

<!-- wp:woocommerce/mini-cart /--></div>
<!-- /wp:group -->

<!-- wp:buttons {"className":"cta-button-wrapper hidden-on-minimal opacity-0 transition-opacity duration-300","style":{"spacing":{"padding":{"top":"0","bottom":"0","left":"var:preset|spacing|20","right":"var:preset|spacing|20"},"margin":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|30"},"blockGap":{"top":"0","left":"0"}}},"layout":{"type":"flex","orientation":"vertical","verticalAlignment":"center","justifyContent":"center","flexWrap":"wrap"}} -->
<div class="wp-block-buttons cta-button-wrapper hidden-on-minimal opacity-0 transition-opacity duration-300" style="margin-top:var(--wp--preset--spacing--30);margin-bottom:var(--wp--preset--spacing--30);padding-top:0;padding-right:var(--wp--preset--spacing--20);padding-bottom:0;padding-left:var(--wp--preset--spacing--20)"><!-- wp:button {"textColor":"background","className":"is-style-fill","style":{"spacing":{"padding":{"left":"var:preset|spacing|20","right":"var:preset|spacing|20","top":"var:preset|spacing|20","bottom":"var:preset|spacing|20"}}},"fontSize":"small"} -->
<div class="wp-block-button is-style-fill"><a class="wp-block-button__link has-background-color has-text-color has-small-font-size has-custom-font-size wp-element-button" style="padding-top:var(--wp--preset--spacing--20);padding-right:var(--wp--preset--spacing--20);padding-bottom:var(--wp--preset--spacing--20);padding-left:var(--wp--preset--spacing--20)">تماس فوری (CTA)</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group -->

<!-- wp:group {"className":"logo-container w-full opacity-0 transition-opacity duration-300 absolute top-1/2 -translate-y-1/2","style":{"spacing":{"padding":{"top":"0","bottom":"0","left":"0","right":"0"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group logo-container w-full opacity-0 transition-opacity duration-300 absolute top-1/2 -translate-y-1/2" style="padding-top:0;padding-right:0;padding-bottom:0;padding-left:0"><!-- wp:site-logo /-->

<!-- wp:site-title {"textAlign":"center","fontSize":"large"} /--></div>
<!-- /wp:group --></header>
<!-- /wp:group -->

<!-- 
    Full-Screen Navigation Overlay (منوی تمام صفحه)
    Note: The width is dynamically calculated via CSS/JS to be (100% - vertical header width)
-->

<!-- wp:group {"className":"full-screen-menu-overlay fixed top-0 left-0 h-full w-full z-[90] opacity-0 pointer-events-none transition-opacity duration-300 ease-in-out bg-surface/95","layout":{"type":"flex","orientation":"vertical","justifyContent":"center","verticalAlignment":"center"}} -->
<div class="wp-block-group full-screen-menu-overlay fixed top-0 left-0 h-full w-full z-[90] opacity-0 pointer-events-none transition-opacity duration-300 ease-in-out bg-surface/95"><!-- wp:navigation {"ref":14,"metadata":{"ignoredHookedBlocks":["woocommerce/customer-account"]},"className":"menu-content space-y-4","layout":{"type":"flex","orientation":"vertical","justifyContent":"center","verticalAlignment":"center","className":"text-4xl lg:text-5xl"}} /--></div>
<!-- /wp:group -->
',
];
