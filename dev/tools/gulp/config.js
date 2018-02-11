const path = require('path');

module.exports = {
    tasks: {
        list: ['scss'],
        default: ['scss']
    },

    autoprefixer: {
        browsers: ['> 1%', 'IE >= 10']
    },

    scss: {
        source: '/web/assets/scss/**/*.scss',
        destination: '/web/assets/css',
        options: {
            outputStyle: process.env.NODE_ENV === 'development' ? 'expanded' : 'compressed',
            includePaths: []
        },

        linting: {
            config: path.resolve(__dirname, '../../../', '.scss-lint.yml')
        }
    },

    js: {
        sources: [],
        destination: '/web/js'
    },

    watch: {
        scss: {
            source: '/web/assets/scss/**/*.scss',
            options: { ignoreInitial: false }
        }
    }
};