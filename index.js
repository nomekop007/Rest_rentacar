
const container = require('./config/dependency-injection/container');

const application = container.resolve('app');
const db = container.resolve('db')


application.start().then(() => {
    if (process.env.DB_MAP === "TRUE") {
        db.sequelize.sync({ alter: true }).then(() => {
            console.log("tablas sincronizadas");
        });
    }
}).catch(err => {
    console.log(err);
    process.exit();
})

