import { PRIORITY } from './PRIORITY';
import { TYPE } from './TYPE';
import { STATUS } from './STATUS';
import { SEVERITY } from './SEVERITY';

export class Bug {
  id: any;
  name: String;
  priority: PRIORITY;
  projectId: String;
  module: String;
  type: TYPE;
  status: STATUS;
  eta: Date;
  buildVersion: String;
  severity: SEVERITY;
  developerId: String;
  testerId: String;
  synopsis: String;
  description: String;
}
