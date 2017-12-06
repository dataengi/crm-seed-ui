export class Actions {

  static readonly UsersManagement: Action = 'UsersManagement';
  static readonly CreateRootUser: Action = 'CreateRootUser';
  static readonly CreateCompanyManagerUser: Action = 'CreateCompanyManagerUser';
  static readonly CompaniesManagement: Action = 'CompaniesManagement';
  static readonly CreateManagerUser: Action = 'CreateManagerUser';
  static readonly OrdersManagement: Action = 'OrdersManagement';
  static readonly Reports: Action = 'Reports';
  static readonly Deploying: Action = 'Deploying';
  static readonly Invoicing: Action = 'Invoicing';
  static readonly Testing: Action = 'Testing';
  static readonly InviteUser: Action = 'InviteUser';
  static readonly CreateCompany: Action = 'CreateCompany';
  static readonly CompanyManagement: Action = 'CompanyManagement'
}

export type Action = 'UsersManagement' |
  'CreateRootUser' |
  'CreateCompanyManagerUser' |
  'CompaniesManagement' |
  'CreateManagerUser' |
  'OrdersManagement' |
  'Reports' |
  'Deploying' |
  'Invoicing' |
  'Testing' |
  'InviteUser' |
  'CreateCompany' |
  'CompanyManagement'
