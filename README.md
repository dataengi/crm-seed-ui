# CRM Seed UI
User web interface for starting new customer relationship management system with scala seed project.

## Brief description
Almost every customer relationship management (CRM) software in different domains usually require to develop functions for managing customer contacts as part of it. These functions include create, edit, share customer information, grouping contacts with categories and filtering with some criteria, user access management to contacts inside software, etc. Proposed project could be used as seed project for building fully functional CRM software.

### Architecture

Project has a multilayer architecture with loosely coupled layers, which allows easy to change the behaviors of each layer without significant changes in others. In such design, there is no big deal to change UI presentation, or to add custom behaviour to data model dictated by business-logic, or to modify access to data storage.
It was designed with the thought of being ready to customisations.

Project consists of two major parts: back end written with Scala and Play Framework as RESTful service, and web-UI developed as one page web app on Angular.

Application:
* [UI](https://github.com/dataengi/crm-seed-ui)
* [Server](https://github.com/dataengi/crm-seed)

### Use cases

Originally CRM refers to practices, strategies and technologies that companies use to manage and analyse customer interactions and data throughout the production lifecycle, with the goal of improving business relationships with customers, assisting in customer retention and driving sales growth. CRM software consolidates customer information and documents into a single CRM database so business users can more easily access and manage it. An integral part of every CRM is management of customer information. 

Project contains all typical use cases for user management and customer management. 

User management panel contains:

* user authorisation
* users list
* user invitation
* user activation/deactivation

Contacts panel contains:

* create/edit/delete contact
* filter/search contacts
* group/ungroup contacts


## Running in presentation mode

Go to Server project for instructions ([link](https://gitlab.com/wt-t/crm)). 

## Running in dev mode

### Requirements

Require Node 6.9.0 or higher, together with NPM 3 or higher.

Run `npm install` in project directory for installing all needed dependencies.

Server part of application is dockerized.    

### Running 

Run `docker-compose` with `docker-compose-dev.yml` compose file:  

```bash
$ docker-compose --file docker-compose-dev.yml up
```

Run application UI with: 
```bash
$ npm run start
```

Application will be started at [localhost:4200](http://localhost:4200)

Default admin account:
```conf
email: admin
password: admin
```

## Integration
### Services
UI use HTTP request to the server for data interaction with json. 
Full list of services can be found in appropriate `<service_name>.service.ts` files.

## Dev documentation

After running UI docker container you can access development [documentation](http://localhost/documentation) like:
`http://localhost/documentation`


## Built With

* [Angular](https://angular.io/docs) - Web Application Platform.
* [CoreUI](http://coreui.io/) - Free Bootstrap Admin Template.

## Contributing

We are welcomes questions via our issues tracker. 
We also greatly appreciate fixes, feature requests, and updates; before submitting a pull request, please visit contributor [guidelines](CONTRIBUTING.md).

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details

