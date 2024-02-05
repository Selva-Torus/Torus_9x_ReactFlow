import start from "../pageComponents/PF_Dashboard/img/start-button.png";
import apiIcon from "../pageComponents/PF_Dashboard/img/api.png";
import decisionIcon from "../pageComponents/PF_Dashboard/img/decision.svg";
import endIcon from "../pageComponents/PF_Dashboard/img/end.png";
// import databaseIcon from "../img/database.png";
import kafkaicon from "../pageComponents/PF_Dashboard/img/kafka-icon.svg";
 import mysql from "../pageComponents/PF_Dashboard/img/mysqldol.svg"
// import { type } from "@testing-library/user-event/dist/type";
import postgres from "../pageComponents/PF_Dashboard/img/postgresql.svg"
import docker from "../pageComponents/PF_Dashboard/img/dock.svg"
import input from "../pageComponents/PF_Dashboard/img/inputfield.svg"
import output from "../pageComponents/PF_Dashboard/img/outputfield.svg"


export const MOCK_JSON = {
  name: "jaffrin",
  age: "24",
  phone: 9994980445,
  address: {
    street: "mathavanam",
    city: "Nazareth",
    pincode: 628617,
    doorNo: {
      pin: "1234",
      testing: {
        overTesting: {
          over: "hi",
        },
      },
    },
  },
  names: "ji",
};

export const MOCK_J = {
  name: {
    value: "jaffrin",
    role: "register",
    property: { name: "name", description: "", nodeType: "defaultNdoe" },
  },
  age: {
    value: 24,
    role: "register",
    property: { name: "age", description: "", nodeType: "defaultNdoe" },
  },
  phone: {
    value: 9994980445,
    role: "register",
    property: { name: "phone", description: "", nodeType: "defaultNdoe" },
  },
  address: {
    value: {
      street: {
        value: "mathavanam",
        role: "register",
        property: { name: "street", description: "", nodeType: "defaultNdoe" },
      },
      city: {
        value: "Nazareth",
        role: "register",
        property: { name: "city", description: "", nodeType: "defaultNdoe" },
      },
      pincode: {
        value: 628617,
        role: "register",
        property: { name: "pincode", description: "", nodeType: "defaultNdoe" },
      },
      doorNo: {
        value: {
          pin: {
            value: 1234,
            role: "register",
            property: { name: "pin", description: "", nodeType: "defaultNdoe" },
          },
          testing: {
            value: {
              overTesting: {
                value: {
                  over: {
                    value: "hi",
                    role: "register",
                    property: {
                      name: "over",
                      description: "",
                      nodeType: "defaultNdoe",
                    },
                  },
                },
                role: "register",
                property: {
                  name: "overTesting",
                  description: "",
                  nodeType: "defaultNdoe",
                },
              },
            },
            role: "register",
            property: {
              name: "testing",
              description: "",
              nodeType: "defaultNdoe",
            },
          },
        },
        role: "register",
        property: { name: "doorNo", description: "", nodeType: "defaultNdoe" },
      },
    },
    role: "register",
    property: { name: "address", description: "", nodeType: "defaultNdoe" },
  },
  qualification: {
    value: {
      SSLC: {
        value: "State Board",
        role: "qa",
        property: { name: "SSLC", description: "", nodeType: "defaultNdoe" },
      },
      HSC: {
        value: "State Board",
        role: "qa",
        property: { name: "HSC", description: "", nodeType: "defaultNdoe" },
      },
      UG: {
        value: "B.E..,CSE",
        role: "qa",
        property: { name: "UG", description: "", nodeType: "defaultNdoe" },
      },
    },
    role: "qa",
    property: {
      name: "qualification",
      description: "",
      nodeType: "defaultNdoe",
    },
  },
  skills: {
    value: {
      softskill: {
        value: " problem-solving, leadership",
        role: "sk",
        property: {
          name: "softskill",
          description: "",
          nodeType: "defaultNdoe",
        },
      },
      hardskill: {
        value: "Budget management",
        role: "sk",
        property: {
          name: "hardskill",
          description: "",
          nodeType: "defaultNdoe",
        },
      },
    },

    role: "sk",
    property: { name: "Skills", description: "", nodeType: "defaultNdoe" },
  },
  livingthings: {
    value: {
      mammals: {
        value: "Dog,Cat",
        role: "life",
        property: { name: "mammals", description: "", nodeType: "defaultNdoe" },
      },
      insect: {
        value: "Butterfly",
        role: "life",
        property: { name: "insect", description: "", nodeType: "defaultNdoe" },
      },
      marine: {
        value: "shark",
        role: "life",
        property: { name: "marine", description: "", nodeType: "defaultNdoe" },
      },
      micro: {
        value: {
          singlecell: {
            value: "bacteria",
            role: "life",
            property: {
              name: "singlecell",
              description: "",
              nodeType: "defaultNdoe",
            },
          },
          multicell: {
            value: "waterBear",
            role: "life",
            property: {
              name: "multicell",
              description: "",
              nodeType: "defaultNdoe",
            },
          },
        },
        role: "life",
        property: { name: "micro", description: "", nodeType: "defaultNdoe" },
      },
    },
    role: "life",
    property: {
      name: "livingthings",
      description: "",
      nodeType: "defaultNdoe",
    },
  },
};

export const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
export const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export const NODES_COLOR = [
  "#aebbff",
  "#92b2ff",
  "#8ad3ff",
  "#b6fffd",
  "#71fff1",
];

export const MENU_DETAILS = [
  { icons: start, name: "Start", type: "startNode" },
  { icons: apiIcon, name: "Api", type: "apiNode" },
  { icons: decisionIcon, name: "Decision", type: "decisionNode" },
  { icons: mysql , name: "Mysql", type: "databaseNode" },
  { icons: kafkaicon, name: "kafka", type: "kafkaNode" },
  { icons: postgres, name: "postgres", type: "postgresNode" },
  { icons: docker, name: "docker", type: "dockerNode" },
  { icons: input, name: "input", type: "inputNode" },
  { icons: output, name: "output", type: "outputNode" },
  { icons: endIcon, name: "End", type: "endNode" },
];

export const table = {
  Entities: [
    {
      tname: "User",

      columns: [
        {
          cname: "id",

          datatype: "Int",

          contraints: "@id @default(autoincrement())",
        },

        {
          cname: "userName",

          datatype: "String?",

          contraints: "",
        },

        {
          cname: "email",

          datatype: "String",

          contraints: "@unique",
        },
      ],

      methods: [
        {
          methodName: "GetALL",

          conditionparams: [],
        },

        {
          methodName: "Get",

          QueryConditions: [
            {
              key: "id",

              datatype: "Int",
            },

            {
              key: "userName",

              datatype: "String",
            },
          ],

          QueryParams: [
            {
              key: "id",

              datatype: "Int",
            },

            {
              key: "userName",

              datatype: "String",
            },

            {
              key: "email",

              datatype: "String",
            },
          ],
        },

        {
          methodName: "Post",

          conditionparams: [],
        },

        {
          methodName: "Put",

          conditionparams: [
            {
              key: "id",

              datatype: "Int",
            },

            {
              key: "userName",

              datatype: "String",
            },
          ],

          QueryParams: [
            {
              key: "email",

              datatype: "String",
            },
          ],
        },

        {
          methodName: "Delete",

          conditionparams: [
            {
              key: "id",

              datatype: "Int",
            },

            {
              key: "userName",

              datatype: "String",
            },
          ],
        },
      ],
    },

    {
      tname: "Profile",

      columns: [
        {
          cname: "id",

          datatype: "Int",

          contraints: "@id @default(autoincrement())",
        },

        {
          cname: "bio",

          datatype: "String?",

          contraints: "",
        },

        {
          cname: "userId",

          datatype: "Int",

          contraints: "@unique",

          relationship: [
            {
              parent: "User",

              parentColumn: "id",

              isOptional: [
                {
                  y: "?",
                },
              ],
            },
          ],
        },
      ],

      methods: [
        {
          methodName: "GetALL",

          conditionparams: [],
        },

        {
          methodName: "Get",

          QueryConditions: [
            {
              key: "id",

              datatype: "Int",
            },

            {
              key: "userId",

              datatype: "Int",
            },
          ],

          QueryParams: [
            {
              key: "id",

              datatype: "Int",
            },

            {
              key: "userId",

              datatype: "Int",
            },

            {
              key: "bio",

              datatype: "String",
            },
          ],
        },

        {
          methodName: "Post",

          conditionparams: [],
        },

        {
          methodName: "Put",

          conditionparams: [
            {
              key: "id",

              datatype: "Int",
            },

            {
              key: "userId",

              datatype: "Int",
            },
          ],

          QueryParams: [
            {
              key: "bio",

              datatype: "String",
            },
          ],
        },

        {
          methodName: "Delete",

          conditionparams: [
            {
              key: "id",

              datatype: "Int",
            },

            {
              key: "userId",

              datatype: "Int",
            },
          ],
        },
      ],
    },

    {
      tname: "Post",

      columns: [
        {
          cname: "id",

          datatype: "Int",

          contraints: "@id @default(autoincrement())",

          relationship: "",
        },

        {
          cname: "createdAt",

          datatype: "DateTime",

          contraints: "@default(now())",
        },

        {
          cname: "updatedAt",

          datatype: "DateTime",

          contraints: "@updatedAt",
        },

        {
          cname: "title",

          datatype: "String",

          contraints: "@db.VarChar(255)",
        },

        {
          cname: "content",

          datatype: "String?",

          contraints: "",
        },

        {
          cname: "published",

          datatype: "Boolean",

          contraints: "@default(false)",
        },

        {
          cname: "authorId",

          datatype: "Int",

          contraints: "",

          relationship: [
            {
              parent: "User",

              parentColumn: "id",

              isOptional: [
                {
                  N: "[]",
                },
              ],
            },
          ],
        },
      ],

      methods: [
        {
          methodName: "GetALL",

          conditionparams: [],
        },

        {
          methodName: "Get",

          QueryConditions: [
            {
              key: "id",

              datatype: "Int",
            },

            {
              key: "title",

              datatype: "String",
            },

            {
              key: "content",

              datatype: "String",
            },

            {
              key: "authorId",

              datatype: "Int",
            },
          ],

          QueryParams: [
            {
              key: "id",

              datatype: "Int",
            },

            {
              key: "title",

              datatype: "String",
            },

            {
              key: "content",

              datatype: "String",
            },

            {
              key: "authorId",

              datatype: "Int",
            },
          ],
        },

        {
          methodName: "Post",

          conditionparams: [],
        },

        {
          methodName: "Put",

          conditionparams: [
            {
              key: "id",

              datatype: "Int",
            },

            {
              key: "authorId",

              datatype: "Int",
            },
          ],

          QueryParams: [
            {
              key: "title",

              datatype: "String",
            },

            {
              key: "content",

              datatype: "String",
            },
          ],
        },

        {
          methodName: "Delete",

          conditionparams: [
            {
              key: "id",

              datatype: "Int",
            },

            {
              key: "title",

              datatype: "String",
            },

            {
              key: "content",

              datatype: "String",
            },
          ],
        },
      ],
    },

    {
      tname: "Topic",

      columns: [
        {
          cname: "id",

          datatype: "Int",

          contraints: "@id @default(autoincrement())",

          relationship: "",
        },

        {
          cname: "name",

          datatype: "String",

          contraints: "",
        },

        {
          cname: "userId",

          datatype: "Int",

          contraints: "",

          relationship: [
            {
              parent: "User",

              parentColumn: "id",

              isOptional: [
                {
                  N: "[]",
                },
              ],
            },
          ],
        },

        {
          cname: "postId",

          datatype: "Int",

          contraints: "",

          relationship: [
            {
              parent: "Post",

              parentColumn: "id",

              isOptional: [
                {
                  N: "[]",
                },
              ],
            },
          ],
        },
      ],

      methods: [
        {
          methodName: "GetALL",

          conditionparams: [],
        },

        {
          methodName: "Get",

          QueryConditions: [
            {
              key: "id",

              datatype: "Int",
            },

            {
              key: "userId",

              datatype: "Int",
            },

            {
              key: "name",

              datatype: "String",
            },
          ],

          QueryParams: [
            {
              key: "id",

              datatype: "Int",
            },

            {
              key: "userId",

              datatype: "Int",
            },

            {
              key: "name",

              datatype: "String",
            },
          ],
        },

        {
          methodName: "Post",

          conditionparams: [],
        },

        {
          methodName: "Put",

          conditionparams: [
            {
              key: "id",

              datatype: "Int",
            },

            {
              key: "userId",

              datatype: "Int",
            },
          ],

          QueryParams: [
            {
              key: "name",

              datatype: "String",
            },
          ],
        },

        {
          methodName: "Delete",

          conditionparams: [
            {
              key: "id",

              datatype: "Int",
            },

            {
              key: "name",

              datatype: "String",
            },
          ],
        },
      ],
    },
  ],
};
