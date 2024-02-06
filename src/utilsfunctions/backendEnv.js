module.exports.config_colorpolicy = {
    "apiNode": {
        "Level1": "#4a90e2",
        "Level2": "#f34f5e",
        "Level3": "#f49f7a",
        "Level4": "#e777ab",
        "Level5": "#a774d4",
        "Level6": "#413d74",
        "Level7":"#fdda79",
        "Level8":  "#4ca68a",
        "Level9": " #92ffdd ",
        "Level10":" #796cf8"
    },
    "decisionNode": {
        "Level1": "#4a90e2",
        "Level2": "#f34f5e",
        "Level3": "#f49f7a",
        "Level4": "#e777ab",
        "Level5": "#a774d4",
        "Level6": "#413d74",
        "Level7":"#fdda79",
        "Level8":  "#4ca68a",
        "Level9": " #92ffdd ",
        "Level10":" #796cf8"
    }
  };
  
  module.exports.workflow_colorpolicy = {
    "apiNode": {
        "Level1": "#4a90e2",
        "Level2": "#f34f5e",
        "Level3": "#f49f7a",
        "Level4": "#e777ab",
        "Level5": "#a774d4",
        "Level6": "#413d74",
        "Level7":"#fdda79",
        "Level8":  "#4ca68a",
        "Level9": " #92ffdd ",
        "Level10":" #796cf8"
    },
  
    "decisionNode": {
        "Level1": "#4a90e2",
        "Level2": "#f34f5e",
        "Level3": "#f49f7a",
        "Level4": "#e777ab",
        "Level5": "#a774d4",
        "Level6": "#413d74",
        "Level7":"#fdda79",
        "Level8":  "#4ca68a",
        "Level9": " #92ffdd ",
        "Level10":" #796cf8"
    },
  };
  
  module.exports.config_controlpolicy = {
    apiNode: { Level1: ['array', 'object', 'string'],
    Level2: ['array', 'object', 'string', 'boolean', 'number', 'null'],
    Level3: ['array', 'object', 'string', 'boolean', 'number', 'null'],
    Level4: ['array', 'object', 'string'],
    Level5: ['array', 'object', 'string'],
    Level6: ['array', 'object', 'string'],
    Level7: ['array', 'object', 'string'],
    Level8: ['array', 'object', 'string'],
    Level9: ['array', 'object', 'string'],
    Level10: ['array', 'object', 'string'],
 },
  
    decisionNode: {
      Level1: ['array', 'object', 'string'],
      Level2: ['array', 'object', 'string', 'boolean', 'number', 'null'],
      Level3: ['array', 'object', 'string', 'boolean', 'number', 'null'],
      Level4: ['array', 'object', 'string'],
      Level5: ['array', 'object', 'string'],
      Level6: ['array', 'object', 'string'],
      Level7: ['array', 'object', 'string'],
      Level8: ['array', 'object', 'string'],
      Level9: ['array', 'object', 'string'],
      Level10: ['array', 'object', 'string'],
    },
  };
  
  module.exports.workflow_controlpolicy = {
    apiNode: {
      Level1: ['array', 'object', 'string', 'boolean'],
      Level1: ['array', 'object', 'string'],
      Level2: ['array', 'object', 'string', 'boolean', 'number', 'null'],
      Level3: ['array', 'object', 'string', 'boolean', 'number', 'null'],
      Level4: ['array', 'object', 'string'],
      Level5: ['array', 'object', 'string'],
      Level6: ['array', 'object', 'string'],
      Level7: ['array', 'object', 'string'],
      Level8: ['array', 'object', 'string'],
      Level9: ['array', 'object', 'string'],
      Level10: ['array', 'object', 'string'],
    },
    decisionNode: {
      Level1: ['array', 'object', 'string'],
      Level2: ['array', 'object', 'string', 'boolean', 'number', 'null'],
      Level3: ['array', 'object', 'string', 'boolean', 'number', 'null'],
      Level4: ['array', 'object', 'string'],
      Level5: ['array', 'object', 'string'],
      Level6: ['array', 'object', 'string'],
      Level7: ['array', 'object', 'string'],
      Level8: ['array', 'object', 'string'],
      Level9: ['array', 'object', 'string'],
      Level10: ['array', 'object', 'string'],
    },
  };
  
  module.exports.save_options = [
    {
      "id": 1,
      "tenant": 'TORUS9X',
      "groups": [
        {
          "id": 1,
          "groupName": 'Group-1',
          "applications": [
            { "id": 'App1', "applicationName": 'app1' },
            { "id": 'App2', "applicationName": 'app2' },
            { "id": 'app3', "applicationName": 'app2' },
          ],
        },
      ],
    },
    {
      "id": 2,
      "tenant": 'GSS9X',
      "groups": [
        {
          "id": 1,
          "groupName": 'ADF',
          "applications": [
            { "id": 'App1', "applicationName": 'TorusPOC' },
            { "id": 'App2', "applicationName": 'app2' },
            { "id": 'app3', "applicationName": 'app2' },
          ],
        },
        {
          "id": 2,
          "groupName": 'TDF',
          "applications": [
            { "id": 'App1', "applicationName": 'TorusPOC' },
            { "id": 'App2', "applicationName": 'app2' },
            { "id": 'app3', "applicationName": 'app2' },
          ],
        },
      ],
    },
    {
      "id": 3,
      "tenant": 'GREAT9X',
      "groups": [
        {
          "id": 1,
          "groupName": 'G2',
          "applications": [
            { "id": 'App1', "applicationName": 'app1' },
            { "id": 'App2', "applicationName": 'app2' },
            { "id": 'app3', "applicationName": 'app2' },
          ],
        },
        {
          "id": 2,
          "groupName": 'G3',
          "applications": [
            { "id": 'App1', "applicationName": 'app1' },
            { "id": 'App2', "applicationName": 'app2' },
            { "id": 'app3', "applicationName": 'app2' },
          ],
        },
      ],
    },
  ];
  
  module.exports.tenant_details = ['1', '2', '3', '4', '5', '6'];
  
   module.exports.roles = [
    { role: 'supervisor', color: '#aebbff' },
    { role: 'admin', color: '#92b2ff' },
    { role: 'testing', color: '#8ad3ff' }
  ];
  
   module.exports.app_pfd_path = './Tenant/App'
  
   module.exports.read_only = '100'
   module.exports.developer = '200'
   module.exports.admin = '300'
  
    module.exports.user_type  = 'ADMIN'
  