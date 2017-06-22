#Eventapture App Tool

#Steps to setup

- Run `npm install` every time you take the latest
- Install MongoDB [click here](https://www.mongodb.com/download-center#enterprise)

> If you are on MAC , you may want to run this command before running other commands below
 ` sudo chown -R `id -u` /data/db`

- Navigate to your MongoDB folder you downloaded, go to bin folder and run `./mongod`
- In the same bin folder, run `./mongo` ( this needs to be done on a separate terminal than the previous `mongod` terminal)
- On the `mongo` terminal, run following commands :

> `use eventapture-admin`


- Go back to the node project and run the project normally by
`npm start` on the root of project