const BASE_URL = "http://localhost:3001";
export const initialCall = async (
  application,
  version,
  processFlow,
  tenant,
  appGroup,
  app
) => {
  try {
    return await fetch(
      `${BASE_URL}/?applicationName=${application}&version=${version}&processFlow=${processFlow}&tenant=${tenant}&appGroup=${appGroup}&app=${app}`,
      {
        method: "GET",
      }
    ).then((res) => res.json());
  } catch (error) {
    throw error;
  }
};

export const saveWorkFlow = async (
  resquestBody,
  type,
  version,
  tenant,
  appGroup,
  app
) => {
  try {
    const URL =
      type === "create"
        ? `${BASE_URL}/?type=${type}&tenant=${tenant}&appGroup=${appGroup}&app=${app}`
        : `${BASE_URL}/?type=${type}&version=${version}&tenant=${tenant}&appGroup=${appGroup}&app=${app}`;
    return await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resquestBody),
    }).then((res) => res.json());
  } catch (error) {
    throw error;
  }
};

export const getApplicationName = async (tenant, appGroup, app) => {
  try {
    return await fetch(
      `${BASE_URL}/applicationName?tenant=${tenant}&appGroup=${appGroup}&app=${app}`,
      {
        method: "GET",
      }
    ).then((res) => res.json());
  } catch (error) {
    throw error;
  }
};

export const deleteApplication = async (
  applicationName,
  tenant,
  appGroup,
  app
) => {
  try {
    return await fetch(
      `${BASE_URL}/deleteApplication?applicationName=${applicationName}&tenant=${tenant}&appGroup=${appGroup}&app=${app}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());
  } catch (error) {
    throw error;
  }
};

export const initailApiCall = async (tenant, appGroup, app) => {
  try {
    return Promise.all([
      fetch(
        `${BASE_URL}/applicationName?tenant=${tenant}&appGroup=${appGroup}&app=${app}`,
        {
          method: "GET",
        }
      ).then((res) => res.json()),
      fetch(`${BASE_URL}/applicationDetails`, {
        method: "GET",
      }).then((res) => res.json()),
    ]).then((res) => res);
    // return await fetch(`${BASE_URL}/applicationName`, {
    //   method: "GET",
    // }).then((res) => res.json());
  } catch (error) {
    console.log(error, "ERROR");
    throw error;
  }
};

export const getRoleDetails = async (roleId) => {
  try {
    return await fetch(`${BASE_URL}/userRole?roleId=${roleId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  } catch (error) {
    throw error;
  }
};

export const getTenantDetails = async () => {
  try {
    return await fetch(`${BASE_URL}/tenantDetails`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  } catch (error) {
    throw error;
  }
};

export const syncFileSystem = async (tenant) => {
  try {
    return await fetch(`${BASE_URL}/sync?tenant=${tenant}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  } catch (error) {
    throw error;
  }
};

export const getControlPolicy = async (nodeType) => {
  try {
    return await fetch(`${BASE_URL}/controlpolicy?nodeType=${nodeType}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  } catch (error) {
    throw error;
  }
};

export const getColorPolicy = async (nodeType) => {
  try {
    return await fetch(`${BASE_URL}/colorpolicy?nodeType=${nodeType}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  } catch (error) {
    throw error;
  }
};
