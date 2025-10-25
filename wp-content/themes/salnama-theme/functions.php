<?php
// اجازه بارگذاری فایل‌های SVG
function allow_svg_uploads($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'allow_svg_uploads');

// جلوگیری از خطای نمایش در پیشخوان
function fix_svg_display() {
    echo '<style>
        img[src$=".svg"] {
            width: 100% !important;
            height: auto !important;
        }
    </style>';
}
add_action('admin_head', 'fix_svg_display');
