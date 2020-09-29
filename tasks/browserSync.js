const { series, watch } = require('gulp');
var sassdoc = require('sassdoc');
var browserSync = require('browser-sync').create();
const scssPath = ['./*.scss', './src/**/*.scss']

watch(scssPath, function(cb) {
    cb()
}, ['sassdoc'])

function browserSync(cb) {
    browserSync.init({
        server: {
            baseDir: './'
        },
        port: 3001,
        startPath: './docs/index.html'
    })
    cb();
}

function sassdoc(db) {
    var options = {
        dest: 'docs',
        verbose: true, // 显示日志
        display: {
            access: ['public', 'private'],
            alias: true,
            watermark: true,
        },
        groups: {
            'undefined': 'Ungrouped',
            foo: 'Foo group',
            bar: 'Bar group',
        },
        basePath: 'https://github.com/SassDoc/sassdoc',
    }

    return src(scssPath)
        .pipe(sassdoc(options));
}

exports.default = {
    browserSync,
    sassdoc
}