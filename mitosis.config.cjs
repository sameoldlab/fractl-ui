module.exports = {
    files: 'src/components/**',
    dest: 'dist',
    targets: ['vue3', 'solid', 'react'],
    getTargetPath: ({ target }) => {
        return target;
    }
  };