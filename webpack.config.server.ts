import config from './webpack.config';

config.target = 'node';
config.entry = {
    server: 'src/server'
};

export default config;
