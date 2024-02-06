export const options = {
  node: [
    {
      id: "b07d4da3-e632-47d0-af05-f85ad7bbc559",
      type: "startNode",
      position: { x: 131.9499969482422, y: 175.26666259765625 },
      parentId: [],
      data: { label: "Start", nodeColor: "#ccc", role: "NoRole" },
      property: {
        name: "Start",
        description: "",
        nodeType: "startNode",
      },
      width: 50,
      height: 50,
      selected: false,
      positionAbsolute: { x: 131.9499969482422, y: 175.26666259765625 },
      dragging: false,
    },
    {
      id: "c2d58e67-179c-48eb-80cd-0478ed3b317b",
      type: "apiNode",
      position: { x: 257.6749954223633, y: 156.64999389648438 },
      parentId: ["b07d4da3-e632-47d0-af05-f85ad7bbc559"],
      data: { label: "Api", nodeColor: "#ccc", role: "NoRole" },
      property: { name: "Api", description: "", nodeType: "apiNode" },
      width: 150,
      height: 40,
      selected: false,
      positionAbsolute: { x: 257.6749954223633, y: 156.64999389648438 },
      dragging: false,
    },
    {
      id: "9610ec23-e038-4c9b-a085-082f71b59ce4",
      type: "endNode",
      position: { x: 480.1749954223633, y: 185.1499938964844 },
      parentId: ["c2d58e67-179c-48eb-80cd-0478ed3b317b"],
      data: { label: "End", nodeColor: "#ccc", role: "NoRole" },
      property: { name: "End", description: "", nodeType: "endNode" },
      width: 50,
      height: 50,
      selected: true,
      positionAbsolute: { x: 480.1749954223633, y: 185.1499938964844 },
      dragging: false,
    },
  ],
  edge: [
    {
      source: "b07d4da3-e632-47d0-af05-f85ad7bbc559",
      sourceHandle: "b",
      target: "c2d58e67-179c-48eb-80cd-0478ed3b317b",
      targetHandle: null,
      type: "smoothstep",
      markerEnd: { type: "arrowclosed" },
      id: "reactflow__edge-b07d4da3-e632-47d0-af05-f85ad7bbc559b-c2d58e67-179c-48eb-80cd-0478ed3b317b",
    },
    {
      source: "c2d58e67-179c-48eb-80cd-0478ed3b317b",
      sourceHandle: "b",
      target: "9610ec23-e038-4c9b-a085-082f71b59ce4",
      targetHandle: null,
      type: "smoothstep",
      markerEnd: { type: "arrowclosed" },
      id: "reactflow__edge-c2d58e67-179c-48eb-80cd-0478ed3b317bb-9610ec23-e038-4c9b-a085-082f71b59ce4",
    },
  ],
  configuration: {
    "c2d58e67-179c-48eb-80cd-0478ed3b317b.Api.WF": {
      Entities: [
        {
          isHeader: "tname",
          columns: [
            {
              cname: "id",
              datatype: "Int",
              contraints: "@id @default(autoincrement())",
            },
            { cname: "userName", datatype: "String?", contraints: "" },
            { cname: "email", datatype: "String", contraints: "@unique" },
          ],
          methods: [
            { methodName: "GetALL", conditionparams: [] },
            {
              methodName: "Get",
              QueryConditions: [
                { key: "id", datatype: "Int" },
                { key: "userName", datatype: "String" },
              ],
              QueryParams: [
                { key: "id", datatype: "Int" },
                { key: "userName", datatype: "String" },
                { key: "email", datatype: "String" },
              ],
            },
            { methodName: "Post", conditionparams: [] },
            {
              methodName: "Put",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "userName", datatype: "String" },
              ],
              QueryParams: [{ key: "email", datatype: "String" }],
            },
            {
              methodName: "Delete",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "userName", datatype: "String" },
              ],
            },
          ],
        },
        {
          isHeader: "tname",
          tname: "Profile",
          columns: [
            {
              cname: "id",
              datatype: "Int",
              contraints: "@id @default(autoincrement())",
            },
            { cname: "bio", datatype: "String?", contraints: "" },
            {
              cname: "userId",
              datatype: "Int",
              contraints: "@unique",
              relationship: [
                {
                  parent: "User",
                  parentColumn: "id",
                  isOptional: [{ y: "?" }],
                },
              ],
            },
          ],
          methods: [
            { methodName: "GetALL", conditionparams: [] },
            {
              methodName: "Get",
              QueryConditions: [
                { key: "id", datatype: "Int" },
                { key: "userId", datatype: "Int" },
              ],
              QueryParams: [
                { key: "id", datatype: "Int" },
                { key: "userId", datatype: "Int" },
                { key: "bio", datatype: "String" },
              ],
            },
            { methodName: "Post", conditionparams: [] },
            {
              methodName: "Put",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "userId", datatype: "Int" },
              ],
              QueryParams: [{ key: "bio", datatype: "String" }],
            },
            {
              methodName: "Delete",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "userId", datatype: "Int" },
              ],
            },
          ],
        },
        {
          isHeader: "tname",
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
            { cname: "content", datatype: "String?", contraints: "" },
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
                    { N: "[]", nObject: { foo: "bar" } },
                    { N: "[]", nObject1: {}, nArray: [] },
                  ],
                },
              ],
            },
          ],
          methods: [
            { methodName: "GetALL", conditionparams: [] },
            {
              methodName: "Get",
              QueryConditions: [
                { key: "id", datatype: "Int" },
                { key: "title", datatype: "String" },
                { key: "content", datatype: "String" },
                { key: "authorId", datatype: "Int" },
              ],
              QueryParams: [
                { key: "id", datatype: "Int" },
                { key: "title", datatype: "String" },
                { key: "content", datatype: "String" },
                { key: "authorId", datatype: "Int" },
              ],
            },
            { methodName: "Post", conditionparams: [] },
            {
              methodName: "Put",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "authorId", datatype: "Int" },
              ],
              QueryParams: [
                { key: "title", datatype: "String" },
                { key: "content", datatype: "String" },
              ],
            },
            {
              methodName: "Delete",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "title", datatype: "String" },
                { key: "content", datatype: "String" },
              ],
            },
          ],
        },
        { helo: "hai" },
        {
          isHeader: "tname",
          tname: "Topic",
          columns: [
            {
              isHeader: "cname",
              cname: "id",
              datatype: "Int",
              contraints: "@id @default(autoincrement())",
              relationship: "",
            },
            {
              isHeader: "cname",
              cname: "name",
              datatype: "String",
              contraints: "",
            },
            {
              isHeader: "cname",
              cname: "userId",
              datatype: "Int",
              contraints: "",
              relationship: [
                {
                  parent: "User",
                  parentColumn: "id",
                  isOptional: [{ isHeader: "N", N: "[]" }],
                },
              ],
            },
            {
              isHeader: "cname",
              cname: "postId",
              datatype: "Int",
              contraints: "",
              relationship: [
                {
                  isHeader: "parent",
                  parent: "Post",
                  parentColumn: "id",
                  isOptional: [{ isHeader: "N", N: "[]" }],
                },
              ],
            },
          ],
          methods: [
            { methodName: "GetALL", conditionparams: [] },
            {
              methodName: "Get",
              QueryConditions: [
                { key: "id", datatype: "Int" },
                { key: "userId", datatype: "Int" },
                { key: "name", datatype: "String" },
              ],
              QueryParams: [
                { key: "id", datatype: "Int" },
                { key: "userId", datatype: "Int" },
                { key: "name", datatype: "String" },
              ],
            },
            { methodName: "Post", conditionparams: [] },
            {
              methodName: "Put",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "userId", datatype: "Int" },
              ],
              QueryParams: [{ key: "name", datatype: "String" }],
            },
            {
              methodName: "Delete",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "name", datatype: "String" },
              ],
            },
          ],
        },
      ],
      Ent2: [
        {
          isHeader: "tname",
          tname: "User",
          columns: [
            {
              isHeader: "cname",
              cname: "id",
              datatype: "Int",
              contraints: "@id @default(autoincrement())",
            },
            { cname: "userName", datatype: "String?", contraints: "" },
            { cname: "email", datatype: "String", contraints: "@unique" },
          ],
          methods: [
            { methodName: "GetALL", conditionparams: [] },
            {
              methodName: "Get",
              QueryConditions: [
                { key: "id", datatype: "Int" },
                { key: "userName", datatype: "String" },
              ],
              QueryParams: [
                { key: "id", datatype: "Int" },
                { key: "userName", datatype: "String" },
                { key: "email", datatype: "String" },
              ],
            },
            { methodName: "Post", conditionparams: [] },
            {
              methodName: "Put",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "userName", datatype: "String" },
              ],
              QueryParams: [{ key: "email", datatype: "String" }],
            },
            {
              methodName: "Delete",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "userName", datatype: "String" },
              ],
            },
          ],
        },
        {
          isHeader: "tname",
          tname: "Profile",
          columns: [
            {
              cname: "id",
              datatype: "Int",
              contraints: "@id @default(autoincrement())",
            },
            { cname: "bio", datatype: "String?", contraints: "" },
            {
              cname: "userId",
              datatype: "Int",
              contraints: "@unique",
              relationship: [
                {
                  parent: "User",
                  parentColumn: "id",
                  isOptional: [{ y: "?" }],
                },
              ],
            },
          ],
          methods: [
            { methodName: "GetALL", conditionparams: [] },
            {
              methodName: "Get",
              QueryConditions: [
                { key: "id", datatype: "Int" },
                { key: "userId", datatype: "Int" },
              ],
              QueryParams: [
                { key: "id", datatype: "Int" },
                { key: "userId", datatype: "Int" },
                { key: "bio", datatype: "String" },
              ],
            },
            { methodName: "Post", conditionparams: [] },
            {
              methodName: "Put",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "userId", datatype: "Int" },
              ],
              QueryParams: [{ key: "bio", datatype: "String" }],
            },
            {
              methodName: "Delete",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "userId", datatype: "Int" },
              ],
            },
          ],
        },
        {
          isHeader: "tname",
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
            { cname: "content", datatype: "String?", contraints: "" },
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
                    { N: "[]", nObject: { foo: "bar" } },
                    { N: "[]", nObject1: {}, nArray: [] },
                  ],
                },
              ],
            },
          ],
          methods: [
            { methodName: "GetALL", conditionparams: [] },
            {
              methodName: "Get",
              QueryConditions: [
                { key: "id", datatype: "Int" },
                { key: "title", datatype: "String" },
                { key: "content", datatype: "String" },
                { key: "authorId", datatype: "Int" },
              ],
              QueryParams: [
                { key: "id", datatype: "Int" },
                { key: "title", datatype: "String" },
                { key: "content", datatype: "String" },
                { key: "authorId", datatype: "Int" },
              ],
            },
            { methodName: "Post", conditionparams: [] },
            {
              methodName: "Put",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "authorId", datatype: "Int" },
              ],
              QueryParams: [
                { key: "title", datatype: "String" },
                { key: "content", datatype: "String" },
              ],
            },
            {
              methodName: "Delete",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "title", datatype: "String" },
                { key: "content", datatype: "String" },
              ],
            },
          ],
        },
        { helo: "hai" },
        {
          isHeader: "tname",
          tname: "Topic",
          columns: [
            {
              cname: "id",
              datatype: "Int",
              contraints: "@id @default(autoincrement())",
              relationship: "",
            },
            { cname: "name", datatype: "String", contraints: "" },
            {
              cname: "userId",
              datatype: "Int",
              contraints: "",
              relationship: [
                {
                  parent: "User",
                  parentColumn: "id",
                  isOptional: [{ N: "[]" }],
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
                  isOptional: [{ N: "[]" }],
                },
              ],
            },
          ],
          methods: [
            { methodName: "GetALL", conditionparams: [] },
            {
              methodName: "Get",
              QueryConditions: [
                { key: "id", datatype: "Int" },
                { key: "userId", datatype: "Int" },
                { key: "name", datatype: "String" },
              ],
              QueryParams: [
                { key: "id", datatype: "Int" },
                { key: "userId", datatype: "Int" },
                { key: "name", datatype: "String" },
              ],
            },
            { methodName: "Post", conditionparams: [] },
            {
              methodName: "Put",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "userId", datatype: "Int" },
              ],
              QueryParams: [{ key: "name", datatype: "String" }],
            },
            {
              methodName: "Delete",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "name", datatype: "String" },
              ],
            },
          ],
        },
      ],
      Ent3: [
        {
          isHeader: "tname",
          tname: "User",
          columns: [
            {
              isHeader: "cname",
              cname: "id",
              datatype: "Int",
              contraints: "@id @default(autoincrement())",
            },
            { cname: "userName", datatype: "String?", contraints: "" },
            { cname: "email", datatype: "String", contraints: "@unique" },
          ],
          methods: [
            { methodName: "GetALL", conditionparams: [] },
            {
              methodName: "Get",
              QueryConditions: [
                { key: "id", datatype: "Int" },
                { key: "userName", datatype: "String" },
              ],
              QueryParams: [
                { key: "id", datatype: "Int" },
                { key: "userName", datatype: "String" },
                { key: "email", datatype: "String" },
              ],
            },
            { methodName: "Post", conditionparams: [] },
            {
              methodName: "Put",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "userName", datatype: "String" },
              ],
              QueryParams: [{ key: "email", datatype: "String" }],
            },
            {
              methodName: "Delete",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "userName", datatype: "String" },
              ],
            },
          ],
        },
        {
          isHeader: "tname",
          tname: "Profile",
          columns: [
            {
              cname: "id",
              datatype: "Int",
              contraints: "@id @default(autoincrement())",
            },
            { cname: "bio", datatype: "String?", contraints: "" },
            {
              cname: "userId",
              datatype: "Int",
              contraints: "@unique",
              relationship: [
                {
                  parent: "User",
                  parentColumn: "id",
                  isOptional: [{ y: "?" }],
                },
              ],
            },
          ],
          methods: [
            { methodName: "GetALL", conditionparams: [] },
            {
              methodName: "Get",
              QueryConditions: [
                { key: "id", datatype: "Int" },
                { key: "userId", datatype: "Int" },
              ],
              QueryParams: [
                { key: "id", datatype: "Int" },
                { key: "userId", datatype: "Int" },
                { key: "bio", datatype: "String" },
              ],
            },
            { methodName: "Post", conditionparams: [] },
            {
              methodName: "Put",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "userId", datatype: "Int" },
              ],
              QueryParams: [{ key: "bio", datatype: "String" }],
            },
            {
              methodName: "Delete",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "userId", datatype: "Int" },
              ],
            },
          ],
        },
        {
          isHeader: "tname",
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
            { cname: "content", datatype: "String?", contraints: "" },
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
                    { N: "[]", nObject: { foo: "bar" } },
                    { N: "[]", nObject1: {}, nArray: [] },
                  ],
                },
              ],
            },
          ],
          methods: [
            { methodName: "GetALL", conditionparams: [] },
            {
              methodName: "Get",
              QueryConditions: [
                { key: "id", datatype: "Int" },
                { key: "title", datatype: "String" },
                { key: "content", datatype: "String" },
                { key: "authorId", datatype: "Int" },
              ],
              QueryParams: [
                { key: "id", datatype: "Int" },
                { key: "title", datatype: "String" },
                { key: "content", datatype: "String" },
                { key: "authorId", datatype: "Int" },
              ],
            },
            { methodName: "Post", conditionparams: [] },
            {
              methodName: "Put",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "authorId", datatype: "Int" },
              ],
              QueryParams: [
                { key: "title", datatype: "String" },
                { key: "content", datatype: "String" },
              ],
            },
            {
              methodName: "Delete",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "title", datatype: "String" },
                { key: "content", datatype: "String" },
              ],
            },
          ],
        },
        { helo: "hai" },
        {
          isHeader: "tname",
          tname: "Topic",
          columns: [
            {
              cname: "id",
              datatype: "Int",
              contraints: "@id @default(autoincrement())",
              relationship: "",
            },
            { cname: "name", datatype: "String", contraints: "" },
            {
              cname: "userId",
              datatype: "Int",
              contraints: "",
              relationship: [
                {
                  parent: "User",
                  parentColumn: "id",
                  isOptional: [{ N: "[]" }],
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
                  isOptional: [{ N: "[]" }],
                },
              ],
            },
          ],
          methods: [
            { methodName: "GetALL", conditionparams: [] },
            {
              methodName: "Get",
              QueryConditions: [
                { key: "id", datatype: "Int" },
                { key: "userId", datatype: "Int" },
                { key: "name", datatype: "String" },
              ],
              QueryParams: [
                { key: "id", datatype: "Int" },
                { key: "userId", datatype: "Int" },
                { key: "name", datatype: "String" },
              ],
            },
            { methodName: "Post", conditionparams: [] },
            {
              methodName: "Put",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "userId", datatype: "Int" },
              ],
              QueryParams: [{ key: "name", datatype: "String" }],
            },
            {
              methodName: "Delete",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "name", datatype: "String" },
              ],
            },
          ],
        },
      ],
      Ent4: [
        {
          isHeader: "tname",
          tname: "User",
          columns: [
            {
              isHeader: "cname",
              cname: "id",
              datatype: "Int",
              contraints: "@id @default(autoincrement())",
            },
            { cname: "userName", datatype: "String?", contraints: "" },
            { cname: "email", datatype: "String", contraints: "@unique" },
          ],
          methods: [
            { methodName: "GetALL", conditionparams: [] },
            {
              methodName: "Get",
              QueryConditions: [
                { key: "id", datatype: "Int" },
                { key: "userName", datatype: "String" },
              ],
              QueryParams: [
                { key: "id", datatype: "Int" },
                { key: "userName", datatype: "String" },
                { key: "email", datatype: "String" },
              ],
            },
            { methodName: "Post", conditionparams: [] },
            {
              methodName: "Put",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "userName", datatype: "String" },
              ],
              QueryParams: [{ key: "email", datatype: "String" }],
            },
            {
              methodName: "Delete",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "userName", datatype: "String" },
              ],
            },
          ],
        },
        {
          isHeader: "tname",
          tname: "Profile",
          columns: [
            {
              cname: "id",
              datatype: "Int",
              contraints: "@id @default(autoincrement())",
            },
            { cname: "bio", datatype: "String?", contraints: "" },
            {
              cname: "userId",
              datatype: "Int",
              contraints: "@unique",
              relationship: [
                {
                  parent: "User",
                  parentColumn: "id",
                  isOptional: [{ y: "?" }],
                },
              ],
            },
          ],
          methods: [
            { methodName: "GetALL", conditionparams: [] },
            {
              methodName: "Get",
              QueryConditions: [
                { key: "id", datatype: "Int" },
                { key: "userId", datatype: "Int" },
              ],
              QueryParams: [
                { key: "id", datatype: "Int" },
                { key: "userId", datatype: "Int" },
                { key: "bio", datatype: "String" },
              ],
            },
            { methodName: "Post", conditionparams: [] },
            {
              methodName: "Put",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "userId", datatype: "Int" },
              ],
              QueryParams: [{ key: "bio", datatype: "String" }],
            },
            {
              methodName: "Delete",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "userId", datatype: "Int" },
              ],
            },
          ],
        },
        {
          isHeader: "tname",
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
            { cname: "content", datatype: "String?", contraints: "" },
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
                    { N: "[]", nObject: { foo: "bar" } },
                    { N: "[]", nObject1: {}, nArray: [] },
                  ],
                },
              ],
            },
          ],
          methods: [
            { methodName: "GetALL", conditionparams: [] },
            {
              methodName: "Get",
              QueryConditions: [
                { key: "id", datatype: "Int" },
                { key: "title", datatype: "String" },
                { key: "content", datatype: "String" },
                { key: "authorId", datatype: "Int" },
              ],
              QueryParams: [
                { key: "id", datatype: "Int" },
                { key: "title", datatype: "String" },
                { key: "content", datatype: "String" },
                { key: "authorId", datatype: "Int" },
              ],
            },
            { methodName: "Post", conditionparams: [] },
            {
              methodName: "Put",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "authorId", datatype: "Int" },
              ],
              QueryParams: [
                { key: "title", datatype: "String" },
                { key: "content", datatype: "String" },
              ],
            },
            {
              methodName: "Delete",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "title", datatype: "String" },
                { key: "content", datatype: "String" },
              ],
            },
          ],
        },
        { helo: "hai" },
        {
          isHeader: "tname",
          tname: "Topic",
          columns: [
            {
              cname: "id",
              datatype: "Int",
              contraints: "@id @default(autoincrement())",
              relationship: "",
            },
            { cname: "name", datatype: "String", contraints: "" },
            {
              cname: "userId",
              datatype: "Int",
              contraints: "",
              relationship: [
                {
                  parent: "User",
                  parentColumn: "id",
                  isOptional: [{ N: "[]" }],
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
                  isOptional: [{ N: "[]" }],
                },
              ],
            },
          ],
          methods: [
            { methodName: "GetALL", conditionparams: [] },
            {
              methodName: "Get",
              QueryConditions: [
                { key: "id", datatype: "Int" },
                { key: "userId", datatype: "Int" },
                { key: "name", datatype: "String" },
              ],
              QueryParams: [
                { key: "id", datatype: "Int" },
                { key: "userId", datatype: "Int" },
                { key: "name", datatype: "String" },
              ],
            },
            { methodName: "Post", conditionparams: [] },
            {
              methodName: "Put",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "userId", datatype: "Int" },
              ],
              QueryParams: [{ key: "name", datatype: "String" }],
            },
            {
              methodName: "Delete",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "name", datatype: "String" },
              ],
            },
          ],
        },
      ],
      Ent5: [
        {
          isHeader: "tname",
          tname: "User",
          columns: [
            {
              isHeader: "cname",
              cname: "id",
              datatype: "Int",
              contraints: "@id @default(autoincrement())",
            },
            { cname: "userName", datatype: "String?", contraints: "" },
            { cname: "email", datatype: "String", contraints: "@unique" },
          ],
          methods: [
            { methodName: "GetALL", conditionparams: [] },
            {
              methodName: "Get",
              QueryConditions: [
                { key: "id", datatype: "Int" },
                { key: "userName", datatype: "String" },
              ],
              QueryParams: [
                { key: "id", datatype: "Int" },
                { key: "userName", datatype: "String" },
                { key: "email", datatype: "String" },
              ],
            },
            { methodName: "Post", conditionparams: [] },
            {
              methodName: "Put",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "userName", datatype: "String" },
              ],
              QueryParams: [{ key: "email", datatype: "String" }],
            },
            {
              methodName: "Delete",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "userName", datatype: "String" },
              ],
            },
          ],
        },
        {
          isHeader: "tname",
          tname: "Profile",
          columns: [
            {
              cname: "id",
              datatype: "Int",
              contraints: "@id @default(autoincrement())",
            },
            { cname: "bio", datatype: "String?", contraints: "" },
            {
              cname: "userId",
              datatype: "Int",
              contraints: "@unique",
              relationship: [
                {
                  parent: "User",
                  parentColumn: "id",
                  isOptional: [{ y: "?" }],
                },
              ],
            },
          ],
          methods: [
            { methodName: "GetALL", conditionparams: [] },
            {
              methodName: "Get",
              QueryConditions: [
                { key: "id", datatype: "Int" },
                { key: "userId", datatype: "Int" },
              ],
              QueryParams: [
                { key: "id", datatype: "Int" },
                { key: "userId", datatype: "Int" },
                { key: "bio", datatype: "String" },
              ],
            },
            { methodName: "Post", conditionparams: [] },
            {
              methodName: "Put",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "userId", datatype: "Int" },
              ],
              QueryParams: [{ key: "bio", datatype: "String" }],
            },
            {
              methodName: "Delete",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "userId", datatype: "Int" },
              ],
            },
          ],
        },
        {
          isHeader: "tname",
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
            { cname: "content", datatype: "String?", contraints: "" },
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
                    { N: "[]", nObject: { foo: "bar" } },
                    { N: "[]", nObject1: {}, nArray: [] },
                  ],
                },
              ],
            },
          ],
          methods: [
            { methodName: "GetALL", conditionparams: [] },
            {
              methodName: "Get",
              QueryConditions: [
                { key: "id", datatype: "Int" },
                { key: "title", datatype: "String" },
                { key: "content", datatype: "String" },
                { key: "authorId", datatype: "Int" },
              ],
              QueryParams: [
                { key: "id", datatype: "Int" },
                { key: "title", datatype: "String" },
                { key: "content", datatype: "String" },
                { key: "authorId", datatype: "Int" },
              ],
            },
            { methodName: "Post", conditionparams: [] },
            {
              methodName: "Put",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "authorId", datatype: "Int" },
              ],
              QueryParams: [
                { key: "title", datatype: "String" },
                { key: "content", datatype: "String" },
              ],
            },
            {
              methodName: "Delete",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "title", datatype: "String" },
                { key: "content", datatype: "String" },
              ],
            },
          ],
        },
        { helo: "hai" },
        {
          isHeader: "tname",
          tname: "Topic",
          columns: [
            {
              cname: "id",
              datatype: "Int",
              contraints: "@id @default(autoincrement())",
              relationship: "",
            },
            { cname: "name", datatype: "String", contraints: "" },
            {
              cname: "userId",
              datatype: "Int",
              contraints: "",
              relationship: [
                {
                  parent: "User",
                  parentColumn: "id",
                  isOptional: [{ N: "[]" }],
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
                  isOptional: [{ N: "[]" }],
                },
              ],
            },
          ],
          methods: [
            { methodName: "GetALL", conditionparams: [] },
            {
              methodName: "Get",
              QueryConditions: [
                { key: "id", datatype: "Int" },
                { key: "userId", datatype: "Int" },
                { key: "name", datatype: "String" },
              ],
              QueryParams: [
                { key: "id", datatype: "Int" },
                { key: "userId", datatype: "Int" },
                { key: "name", datatype: "String" },
              ],
            },
            { methodName: "Post", conditionparams: [] },
            {
              methodName: "Put",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "userId", datatype: "Int" },
              ],
              QueryParams: [{ key: "name", datatype: "String" }],
            },
            {
              methodName: "Delete",
              conditionparams: [
                { key: "id", datatype: "Int" },
                { key: "name", datatype: "String" },
              ],
            },
          ],
        },
      ],
    },
  },
};
