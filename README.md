# BoilerMaker

This BoilerMaker uses its own Sessions Model and all Models (_including the Sessions
Model_) are stored in a **test** Postgres Schema. Also, the Postgres database is stored on
a home Ubuntu Server. So the Sequelize constructor function has some different
input paramters.
