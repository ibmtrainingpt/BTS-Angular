export class Bug {
  id: any;
  name: String;
  priority: string = 'LOW';
  projectId: String;
  module: String;
  type: string = 'SYNTAX';
  status: string = 'NEW';
  eta: Date;
  buildVersion: String;
  severity: string = 'LOW';
  developerId: String;
  testerId: String;
  synopsis: String;
  description: String;
  etaString: string;
}
