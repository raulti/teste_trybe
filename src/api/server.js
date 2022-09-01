const app = require('./app.js');
require('./config/database.ts');
const { default: config } = require('./config/index.ts');
const { default: logger } = require('./utils/logger.ts');
const { default: routers } = require('./controllers/index.ts'); 
const { default: ErrorMiddleware } = require('./middleware/error.middleware.ts');
 
routers(app);
app.use(ErrorMiddleware);

app.listen(config.port, () => logger.info(`conectado na porta ${config.port}`));
