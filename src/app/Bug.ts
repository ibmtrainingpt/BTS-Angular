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

enum PRIORITY {
  LOW,
  MEDIUM,
  HIGH,
}

enum TYPE {
  LOGICAL,
  SYNTAX,
  API,
  GUI,
  RUNTIME,
}

enum STATUS {
  NEW,
  ASSIGNED,
  OPEN,
  FIXED,
  PENDING_RETEST,
  RETEST,
  REOPEN,
  VERIFIED,
  CLOSED,
  REJECTED,
  DUPLICATE,
  DEFERRED,
  NOT_A_BUG,
  COULD_NOT_REPRODUCE,
  WONT_FIX,
  NEED_MORE_INFO,
}

enum SEVERITY {
  LOW,
  MINOR,
  MAJOR,
  CRITICAL,
  BLOCKER,
}
