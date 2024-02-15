import { Handle, Position } from "reactflow";
import { useCallback, useContext, useState } from "react";
import kafka from "../../img/kafka-icon.svg";
import { DarkmodeContext } from "@/pageComponents/PF_Dashboard/context/DarkmodeContext";
import './customNode.css'
export function ApiNode({ data, isConnectable }) {
  const { darkmode, toggleDarkmode } = useContext(DarkmodeContext);
  return (
    <div
      className="custom-node"
      style={{
        border: "1px solid" + data.nodeColor,

        backgroundColor: darkmode ? "transparent" : "#F0EEED",

        // boxShadow: `  0 0 10px 1px ${data.nodeColor}`,
      }}
    >
      <span
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "3px",
          marginBottom: "-5px",
        }}
      >
        <svg
          fill={data.nodeColor}
          height="26px"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 511 511"
        >
          <g>
            <path
              fill={data.nodeColor}
              d="M492.168,309.579l-17.626-10.177c2.96-14.723,4.458-29.466,4.458-43.902c0-14.646-1.474-29.403-4.384-43.946l17.552-10.134
		c5.436-3.138,9.325-8.206,10.949-14.269s0.791-12.396-2.348-17.832l-48-83.139c-3.139-5.436-8.206-9.325-14.269-10.949
		c-6.064-1.624-12.396-0.791-17.833,2.348l-17.566,10.142C380.912,68.2,354.798,53.092,327,43.692V23.5
		C327,10.542,316.458,0,303.5,0h-96C194.542,0,184,10.542,184,23.5v20.193c-27.65,9.362-53.728,24.49-75.999,44.088L90.332,77.579
		c-5.437-3.139-11.77-3.973-17.833-2.348c-6.063,1.625-11.13,5.513-14.269,10.949l-48,83.139
		c-3.139,5.436-3.972,11.769-2.348,17.832s5.513,11.131,10.949,14.269l17.626,10.177C33.499,226.32,32,241.063,32,255.5
		c0,14.644,1.474,29.401,4.384,43.945l-17.552,10.134c-11.222,6.479-15.08,20.879-8.602,32.102l48,83.139
		c6.479,11.221,20.879,15.08,32.102,8.601l17.565-10.142c22.19,19.521,48.303,34.629,76.103,44.03V487.5
		c0,12.958,10.542,23.5,23.5,23.5h96c12.958,0,23.5-10.542,23.5-23.5v-20.193c27.651-9.362,53.729-24.49,76-44.087l17.668,10.201
		c11.221,6.479,25.623,2.62,32.102-8.601l48-83.139C507.248,330.458,503.39,316.058,492.168,309.579z M487.779,334.181l-48,83.138
		c-2.343,4.06-7.552,5.455-11.611,3.111l-22.392-12.928c-2.845-1.643-6.43-1.242-8.842,0.989
		c-22.893,21.173-50.437,37.148-79.653,46.199c-3.14,0.973-5.281,3.877-5.281,7.164V487.5c0,4.687-3.813,8.5-8.5,8.5h-96
		c-4.687,0-8.5-3.813-8.5-8.5v-25.645c0-3.287-2.141-6.191-5.28-7.164c-29.396-9.107-56.974-25.062-79.755-46.139
		c-1.421-1.315-3.25-1.995-5.095-1.995c-1.286,0-2.579,0.33-3.748,1.005L82.832,420.43c-4.06,2.343-9.268,0.948-11.611-3.111
		l-48-83.138c-2.343-4.059-0.947-9.268,3.111-11.612l22.272-12.859c2.844-1.642,4.289-4.942,3.566-8.146
		C48.739,286.357,47,270.858,47,255.5c0-15.1,1.765-30.584,5.247-46.022c0.722-3.203-0.723-6.504-3.566-8.145L26.332,188.43
		c-1.966-1.135-3.372-2.968-3.96-5.161c-0.587-2.193-0.286-4.484,0.849-6.45l48-83.139c1.135-1.966,2.968-3.373,5.162-3.96
		c2.192-0.588,4.484-0.286,6.45,0.849l22.392,12.928c2.846,1.644,6.43,1.242,8.842-0.989c22.894-21.173,50.437-37.148,79.653-46.199
		c3.14-0.973,5.281-3.877,5.281-7.164V23.5c0-4.687,3.813-8.5,8.5-8.5h96c4.687,0,8.5,3.813,8.5,8.5v25.645
		c0,3.287,2.141,6.191,5.28,7.164c29.395,9.106,56.973,25.061,79.755,46.139c2.412,2.232,5.997,2.633,8.843,0.99l22.29-12.869
		c1.967-1.135,4.258-1.437,6.45-0.849c2.193,0.588,4.026,1.994,5.162,3.96l48,83.139c1.135,1.966,1.437,4.257,0.849,6.45
		c-0.588,2.193-1.994,4.026-3.96,5.161l-22.272,12.859c-2.844,1.642-4.289,4.943-3.566,8.146c3.431,15.206,5.17,30.704,5.17,46.065
		c0,15.1-1.765,30.584-5.247,46.021c-0.722,3.203,0.723,6.503,3.566,8.145l22.349,12.903
		C488.727,324.913,490.123,330.122,487.779,334.181z"
            />
            <path
              fill={data.nodeColor}
              d="M255.5,104C171.962,104,104,171.963,104,255.5S171.962,407,255.5,407S407,339.037,407,255.5S339.038,104,255.5,104z
		 M255.5,392C180.234,392,119,330.766,119,255.5S180.234,119,255.5,119S392,180.234,392,255.5S330.766,392,255.5,392z"
            />
            <path
              fill={data.nodeColor}
              d="M283.5,216h-28c-4.142,0-7.5,3.358-7.5,7.5v64c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5V271h20.5
		c15.164,0,27.5-12.336,27.5-27.5S298.664,216,283.5,216z M283.5,256H263v-25h20.5c6.893,0,12.5,5.607,12.5,12.5
		S290.393,256,283.5,256z"
            />
            <path
              fill={data.nodeColor}
              d="M214.522,220.867c-1.098-2.927-3.896-4.867-7.022-4.867h-8c-3.126,0-5.925,1.939-7.022,4.867l-24,64
		c-1.455,3.878,0.511,8.201,4.389,9.656c3.878,1.455,8.201-0.511,9.656-4.389L186.697,279h33.605l4.175,11.133
		c1.129,3.011,3.987,4.869,7.023,4.869c0.875,0,1.765-0.154,2.632-0.479c3.878-1.454,5.844-5.778,4.389-9.656L214.522,220.867z
		 M192.322,264l11.178-29.807L214.678,264H192.322z"
            />
            <path
              fill={data.nodeColor}
              d="M327.5,216c-4.142,0-7.5,3.358-7.5,7.5v64c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5v-64
		C335,219.358,331.642,216,327.5,216z"
            />
            <path
              fill={data.nodeColor}
              d="M309.152,87.3c5.205,1.659,10.394,3.586,15.421,5.726c0.958,0.408,1.954,0.601,2.934,0.601c2.916,0,5.69-1.712,6.904-4.564
		c1.622-3.811-0.152-8.216-3.963-9.838c-5.458-2.323-11.09-4.415-16.742-6.216c-3.945-1.258-8.165,0.922-9.423,4.868
		C303.026,81.823,305.206,86.042,309.152,87.3z"
            />
            <path
              fill={data.nodeColor}
              d="M100.45,339.904c-1.984-3.636-6.541-4.976-10.176-2.992c-3.636,1.984-4.976,6.54-2.992,10.176
		c3.112,5.704,6.557,11.315,10.239,16.677c1.454,2.117,3.801,3.255,6.189,3.255c1.463,0,2.941-0.427,4.239-1.318
		c3.415-2.345,4.282-7.014,1.937-10.428C106.493,350.332,103.318,345.161,100.45,339.904z"
            />
            <path
              fill={data.nodeColor}
              d="M240.14,431.341c-40.189-3.463-78.337-20.879-107.416-49.041c-2.976-2.882-7.724-2.805-10.605,0.17
		c-2.881,2.976-2.806,7.724,0.17,10.605c31.55,30.555,72.947,49.452,116.563,53.21c0.219,0.019,0.436,0.028,0.652,0.028
		c3.851,0,7.127-2.949,7.464-6.856C247.323,435.331,244.266,431.697,240.14,431.341z"
            />
            <path
              fill={data.nodeColor}
              d="M363.425,97.287c-3.42-2.337-8.087-1.459-10.424,1.96c-2.337,3.42-1.459,8.087,1.96,10.424
		c34.844,23.813,60.049,59.248,70.972,99.776c0.902,3.346,3.93,5.55,7.237,5.55c0.646,0,1.303-0.084,1.956-0.26
		c4-1.078,6.368-5.194,5.29-9.193C428.564,161.564,401.221,123.118,363.425,97.287z"
            />
          </g>
        </svg>
      </span>

      {isConnectable && (
        <>
          <Handle
            type="source"
            position={Position.Right}
            isConnectable={isConnectable}
            className="custom-node-handle"
            style={{
              // transform: "translate(0px,-1px) ",
              position: "absolute",
              // width: "1px",
              // height: "40%",
              borderRadius: "50%",
              backgroundColor: data.nodeColor,
            }}
          />
          <Handle
            type="target"
            position={Position.Left}
            id="a"
            className="custom-node-handle"
            style={{
              // transform: "translate(0px,-1px) ",
              position: "absolute",
              // width: "1px",
              // height: "40%",
              borderRadius: "50%",
              backgroundColor: data.nodeColor,
            }}
            isConnectable={isConnectable}
          />
        </>
      )}
      <div
        style={{
          width: "80%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: darkmode ? "white" : "black",
          textAlign: "center",
        }}
      >
        <label
          title={isConnectable ? data.label : data?.nodeType}
          style={{
            // width:"100%",
            textAlign: "center",
            fontSize: "8px",
            color: darkmode ? "white" : "black",
            fontFamily: "monospace",
          }}
          htmlFor=""
        >
          {isConnectable ? data.label : data?.nodeType}
        </label>
      </div>
    </div>
  );
}

export function DecisionNode({ data, isConnectable }) {
  const { darkmode, toggleDarkmode } = useContext(DarkmodeContext);
  const onChange = useCallback((evt) => {}, []);

  return (
    <div
      className="custom-node"
      style={{
        border: "1px solid" + data.nodeColor,
        backgroundColor: darkmode ? "transparent" : "#F0EEED",
        // boxShadow: `  0 0 10px 1px ${data.nodeColor}`,
      }}
    >
      {
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "3px",
            marginBottom: "-5px",
          }}
        >
          <svg
            fill={data?.nodeColor}
            height="29px"
            viewBox="-3.2 -3.2 38.40 38.40"
            id="icon"
            xmlns="http://www.w3.org/2000/svg"
            transform="rotate(90)matrix(1, 0, 0, 1, 0, 0)"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              <path d="M30,12V4H22V7H18a2.0023,2.0023,0,0,0-2,2v6H10V12H2v8h8V17h6v6a2.0023,2.0023,0,0,0,2,2h4v3h8V20H22v3H18V9h4v3ZM8,18H4V14H8Zm16,4h4v4H24ZM24,6h4v4H24Z" />{" "}
              <rect
                id="_Transparent_Rectangle_"
                data-name="&lt;Transparent Rectangle&gt;"
                class="cls-1 "
                width="22"
                height="22"
                fill="none"
              />
            </g>
          </svg>
        </span>
      }
      {isConnectable && (
        <>
          <Handle
            type="target"
            position={Position.Left}
            isConnectable={isConnectable}
            className="custom-node-handle"
            style={{
              // transform: "translate(0px,-1px) ",
              position: "absolute",
              // width: "1px",
              // height: "40%",
              borderRadius: "50%",
              backgroundColor: data?.nodeColor,
            }}
          />

          <Handle
            type="source"
            position={Position.Right}
            id="a"
            className="custom-node-handle"
            style={{
              // transform: "translate(0px,-1px) ",
              position: "absolute",
              // width: "1px",
              // height: "10%",
              borderRadius: "50%",
              backgroundColor: data?.nodeColor,
              // boxShadow:"0 0 10px rgba(131, 226, 131, 1)"
            }}
            isConnectable={isConnectable}
          />
          <Handle
            type="source"
            position={Position.Bottom}
            id="b"
            className="custom-node-handle"
            style={{
              // transform: "translate(0px,-1px) ",
              position: "absolute",
              // width: "40%",
              // height: "1px",
              borderRadius: "50%",
              backgroundColor: data?.nodeColor,
              // boxShadow:"0 0 10px rgba(255, 160, 154, 1)",
            }}
            isConnectable={isConnectable}
          />
          <Handle
            type="source"
            position={Position.Top}
            id="c"
            className="custom-node-handle"
            style={{
              // transform: "translate(0px,-1px) ",
              position: "absolute",
              // width: "40%",
              // height: "1px",
              borderRadius: "50%",
              backgroundColor: data?.nodeColor,
            }}
            isConnectable={isConnectable}
          />
        </>
      )}
      <div
        style={{
          width: "80%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: darkmode ? "white" : "black",
          textAlign: "center",
        }}
      >
        <label
          title={isConnectable ? data.label : data?.nodeType}
          style={{
            // width:"100%",
            textAlign: "center",
            fontSize: "8px",
            color: darkmode ? "white" : "black",
            fontFamily: "monospace",
          }}
          htmlFor=""
        >
          {isConnectable ? data.label : data?.nodeType}
        </label>
      </div>
    </div>
  );
}

export function EndNode({ data, isConnectable }) {
  const { darkmode, toggleDarkmode } = useContext(DarkmodeContext);
  const onChange = useCallback((evt) => {}, []);
  const [isVisible, setIsVisible] = useState(true);

  const onDragOvers = () => {
    alert("her");
    setIsVisible((visible) => !visible);
  };

  return (
    <div className="custom-node-img">
      <div
        className="custom-node"
        style={{
          // boxShadow: `  0 0 10px 1px  rgba(255, 160, 154, 1)`,
          border: `1px solid #FFA09A`,
          backgroundColor: darkmode ? "transparent" : "#F0EEED",
        }}
      >
        {
          <svg
            className="custom-node-img"
            fill=" rgba(255, 160, 154, 1)"
            version="1.1"
            id="Uploaded to svgrepo.com"
            xmlns="http://www.w3.org/2000/svg"
            height="35px"
            viewBox="0 0 32 32"
            opacity="0.7"
          >
            <path
              class="bentblocks_een"
              d="M12,20h8v-8h-8V20z M14,14h4v4h-4V14z M16,4C9.373,4,4,9.373,4,16s5.373,12,12,12s12-5.373,12-12
       S22.627,4,16,4z M16,26c-5.514,0-10-4.486-10-10S10.486,6,16,6s10,4.486,10,10S21.514,26,16,26z"
            />
          </svg>
        }
        <Handle
          type="target"
          position={Position.Left}
          isConnectable={isConnectable}
          className="custom-node-handle"
          style={{
            // transform: "translate(0px,-1px) ",
            position: "absolute",
            // width: "1px",
            //   height: "40%",
            borderRadius: "50%",
            backgroundColor: data.nodeColor,
          }}
        />
        <div
          style={{
            fontSize: "8px",
            color: darkmode ? "white" : "black",
            fontFamily: "monospace",
          }}
        >
          <label
            title={isConnectable ? data.label : data?.nodeType}
            htmlFor="text"
          >
            {isConnectable ? data.label : data?.nodeType}
          </label>
        </div>
      </div>
    </div>
  );
}

export function StartNode({ data, isConnectable }) {
  const { darkmode, toggleDarkmode } = useContext(DarkmodeContext);
  return (
    <div className="custom-node-img">
      <div
        className="custom-node"
        style={{
          backgroundColor: darkmode ? "transparent" : "#F0EEED",
          // boxShadow: `  0 0 10px rgba(131, 226, 131, 1) `,
          border: `1px solid #83E283`,
        }}
      >
        {
          <svg
            fill="rgba(131, 226, 131, 1)"
            height="30px"
            viewBox="-1.6 -1.6 19.20 19.20"
            xmlns="http://www.w3.org/2000/svg"
            opacity="0.7"
            class="bi bi-skip-start-circle"
            transform="rotate(180)"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M10.229 5.055a.5.5 0 0 0-.52.038L7 7.028V5.5a.5.5 0 0 0-1 0v5a.5.5 0 0 0 1 0V8.972l2.71 1.935a.5.5 0 0 0 .79-.407v-5a.5.5 0 0 0-.271-.445z" />{" "}
            </g>
          </svg>
        }
        <label
          title={isConnectable ? data.label : data?.nodeType}
          style={{
            fontSize: "8px",
            color: darkmode ? "white" : "black",
            fontFamily: "monospace",
          }}
          htmlFor=""
        >
          {isConnectable ? data.label : data?.nodeType}
        </label>

        {isConnectable && (
          <Handle
            type="source"
            position={Position.Right}
            id="b"
            isConnectable={isConnectable}
            className="custom-node-handle"
            style={{
              // transform: "translate(0px,-1px) ",
              position: "absolute",
              // width: "1px",
              // height: "40%",
              borderRadius: "50%",
              backgroundColor: data.nodeColor,
            }}
            // style={{ borderColor: "green" }}
          />
        )}
      </div>
    </div>
  );
}

export function DefaultNode({ data, isConnectable }) {
  const { darkmode, toggleDarkmode } = useContext(DarkmodeContext);
  return (
    <div
      className="custom-node"
      style={{
        backgroundColor: darkmode ? "transparent" : "#F0EEED",
        // boxShadow: `  0 0 10px 1px ${data.nodeColor}`,
      }}
    >
      {isConnectable && (
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
          className="custom-node-handle"
          style={{
            // transform: "translate(0px,-1px) ",
            position: "absolute",
            // width: "1px",
            // height: "40%",
            borderRadius: "50%",
            backgroundColor: data.nodeColor,
          }}
        />
      )}
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          fontSize: "10px",
        }}
      >
        <div
          style={{
            width: "80%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: darkmode ? "white" : "black",
            textAlign: "center",
          }}
        >
          <label
            title={isConnectable ? data.label : data?.nodeType}
            style={{
              // width:"100%",
              textAlign: "center",
              fontSize: "8px",
              color: darkmode ? "white" : "black",
              fontFamily: "monospace",
            }}
            htmlFor=""
          >
            {isConnectable ? data.label : data?.nodeType}
          </label>
        </div>
      </div>

      {isConnectable && (
        <Handle
          type="source"
          position={Position.Bottom}
          id="b"
          className="custom-node-handle"
          style={{
            // transform: "translate(0px,-1px) ",
            position: "absolute",
            // width: "1px",
            // height: "40%",
            borderRadius: "50%",
            backgroundColor: data.nodeColor,
          }}
          isConnectable={isConnectable}
        />
      )}
    </div>
  );
}

export function DatabaseNode({ data, isConnectable }) {
  const { darkmode, toggleDarkmode } = useContext(DarkmodeContext);
  return (
    <div className="custom-node-img">
      <div
        className="custom-node "
        style={{
          border: "1px solid" + data.nodeColor,
          backgroundColor: darkmode ? "transparent" : "#F0EEED",
          // boxShadow: `  0 0 10px 1px ${data.nodeColor}`,
        }}
      >
        <i
          class="fa fa-mysql custom-node-img "
          style={{
            fontSize: "27px",
            color: `${data.nodeColor}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "3px",
            marginBottom: "-5px",
          }}
        ></i>

        {isConnectable && (
          <>
            <Handle
              type="source"
              position={Position.Right}
              isConnectable={isConnectable}
              className="custom-node-handle"
              style={{
                // transform: "translate(0px,-1px) ",
                position: "absolute",
                // width: "1px",
                // height: "40%",
                borderRadius: "50%",
                backgroundColor: data.nodeColor,
              }}
            />
            <Handle
              type="target"
              position={Position.Left}
              id="a"
              className="custom-node-handle"
              style={{
                // transform: "translate(0px,-1px) ",
                position: "absolute",
                // width: "1px",
                // height: "40%",
                borderRadius: "50%",
                backgroundColor: data.nodeColor,
              }}
              isConnectable={isConnectable}
            />
          </>
        )}
        <div
          style={{
            width: "80%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: darkmode ? "white" : "black",
            textAlign: "center",
          }}
        >
          <label
            title={isConnectable ? data.label : data?.nodeType}
            style={{
              // width:"100%",
              textAlign: "center",
              fontSize: "8px",
              color: darkmode ? "white" : "black",
              fontFamily: "monospace",
            }}
            htmlFor=""
          >
            {isConnectable ? data.label : data?.nodeType}
          </label>
        </div>
      </div>
    </div>
  );
}

export function KafkaNode({ data, isConnectable }) {
  const { darkmode, toggleDarkmode } = useContext(DarkmodeContext);
  return (
    <div className="custom-node-img">
      <div
        className="custom-node"
        style={{
          border: "1px solid" + data.nodeColor,
          backgroundColor: darkmode ? "transparent" : "#F0EEED",
          // boxShadow: `  0 0 10px 1px ${data.nodeColor}`,
        }}
      >
        {
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "3px",
              marginBottom: "-5px",
            }}
          >
            <svg
              className="custom-node-img"
              preserveAspectRatio="xMidYMid"
              viewBox="0 0 256 413"
              xmlns="http://www.w3.org/2000/svg"
              height="25px"
            >
              <path
                d="m87.9320692 36.714181c-4.5491332-4.5714328-10.8956201-7.3945714-17.9512365-7.3945714-7.0288568 0-13.3262844 2.8231386-17.8218984 7.3945714h-.1293381c-4.5357534 4.5491333-7.358892 10.90008-7.358892 17.9289369 0 7.0556164 2.8231386 13.3530439 7.358892 17.8754176l.1293381.1025784c4.495614 4.5491333 10.7930416 7.3455122 17.8218984 7.3455122 7.0556164 0 13.4021033-2.7963789 17.9512365-7.3455122l.066899-.1025784c4.5580531-4.5223737 7.354432-10.8198012 7.354432-17.8754176 0-7.0288569-2.7963789-13.3798036-7.354432-17.9289369zm-17.9512365 346.639491c7.0556164 0 13.4021033-2.872197 17.9512365-7.367811l.066899-.133798c4.5580531-4.486695 7.354432-10.837641 7.354432-17.817439 0-7.055616-2.7963789-13.379803-7.354432-17.951236h-.066899c-4.5491332-4.624952-10.8956201-7.421331-17.9512365-7.421331-7.0288568 0-13.3262844 2.796379-17.8218984 7.421331h-.1293381c-4.5357534 4.571433-7.358892 10.89562-7.358892 17.951236 0 6.979798 2.8231386 13.330744 7.358892 17.817439l.1293381.133798c4.495614 4.495614 10.7930416 7.367811 17.8218984 7.367811zm137.9725343-76.719793c6.275128-1.645716 11.957085-5.673037 15.422454-11.760848l.468293-.887527c3.081815-5.775615 3.643767-12.438757 1.998051-18.34371-1.659096-6.324187-5.735476-11.916945-11.809907-15.417994l-.352335-.236377c-5.918333-3.242372-12.661754-3.947042-18.856603-2.274566-6.297427 1.569897-11.952624 5.775615-15.400154 11.814366-3.492129 5.980773-4.223558 12.880291-2.551082 19.231238 1.725994 6.243908 5.762235 11.890186 11.796526 15.417994h.04014c6.047671 3.474289 12.89813 4.10314 19.244617 2.457424zm-111.9844958-126.247367c-6.6542223-6.636383-15.8238477-10.793042-25.9880385-10.793042-10.1240514 0-19.2713771 4.156659-25.9122196 10.793042-6.609623 6.614083-10.6860031 15.761409-10.6860031 25.89884 0 10.164191 4.0763801 19.338276 10.6860031 26.028178 6.6408425 6.582863 15.7881682 10.712762 25.9122196 10.712762 10.1641908 0 19.3338162-4.129899 25.9880385-10.712762 6.6230028-6.689902 10.6993828-15.863987 10.6993828-26.028178 0-10.137431-4.07638-19.284757-10.6993828-25.89884zm-14.6107455-43.163246c14.7267038 2.426204 27.9771693 9.48182 38.0878413 19.672771h.080278c1.605577 1.618956 3.175474 3.37171 4.624953 5.146764l25.283368-14.628585c-3.39847-10.271229-3.554567-21.010752-.825088-31.072364 3.608087-13.486842 12.349559-25.5598846 25.452847-33.1373134l.432613-.2586762c12.96057-7.3455122 27.696194-8.8618899 41.000179-5.2538029 13.469002 3.6036271 25.622323 12.3852382 33.186372 25.4796055v.02676c7.52837 13.014089 9.058127 27.95933 5.46342 41.392652-3.581327 13.477923-12.362938 25.631244-25.452846 33.155154l-3.451989 2.04265h-.352335c-12.108723 5.771155-25.426087 6.663142-37.655228 3.447529-10.043772-2.667041-19.257997-8.259799-26.469711-16.229702l-25.243229 14.583986c2.898957 7.680008 4.508993 15.966566 4.508993 24.694658 0 8.701332-1.610036 17.090469-4.508993 24.823995l25.243229 14.530467c7.211714-8.072481 16.425939-13.562661 26.469711-16.229702 13.469003-3.683906 28.405324-2.114009 41.459552 5.49018l.834008.392474v.053519c12.612694 7.626488 21.07765 19.440855 24.618838 32.767139 3.594707 13.353044 2.06495 28.302745-5.46342 41.343593l-.454913.914287-.053519-.080279c-7.564049 12.572555-19.480994 21.09103-32.637801 24.694658-13.500222 3.554567-28.432083 2.03819-41.472931-5.45896v-.107039c-13.103288-7.577429-21.84476-19.677231-25.452847-33.132853-2.729479-10.034853-2.573382-20.778835.825088-31.045605l-25.283368-14.583986c-1.449479 1.779514-3.019376 3.45199-4.624953 5.070946l-.080278.075819c-10.110672 10.141891-23.3611375 17.197507-38.0878413 19.547893v29.217031c10.4942259 2.194288 19.9002283 7.448091 27.2724993 14.815903l.03568.080278c9.878755 9.825236 15.993325 23.517235 15.993325 38.569514 0 15.00322-6.11457 28.61048-15.993325 38.489235l-.03568.156098c-9.9456537 9.878755-23.5975133 15.993325-38.6497923 15.993325-14.9720002 0-28.6416995-6.11457-38.5605939-15.993325h-.0356795v-.156098c-9.8921348-9.878755-16.0200848-23.486015-16.0200848-38.489235 0-15.052279 6.12795-28.744278 16.0200848-38.569514v-.080278h.0356795c7.3588919-7.367812 16.7782737-12.621615 27.24574-14.815903v-29.217031c-14.7400836-2.350386-27.9504097-9.406002-38.0477015-19.547893l-.1070384-.075819c-12.62161472-12.675134-20.5112389-30.104558-20.5112389-49.442834 0-19.284757 7.88962418-36.714181 20.5112389-49.389315h.1070384c10.0972918-10.190951 23.3076179-17.246567 38.0477015-19.672771v-29.087693c-10.4674663-2.274567-19.8868481-7.52391-27.24574-14.8426625h-.0356795v-.0802788c-9.8921348-9.9278143-16.0200848-23.5172348-16.0200848-38.5695138 0-14.9764602 6.12795-28.6952188 16.0200848-38.5739738l.0356795-.0490593c9.9188944-9.90551456 23.5885937-16.0200848 38.5605939-16.0200848 15.052279 0 28.7041386 6.11457024 38.6497923 16.0200848v.0490593h.03568c9.878755 9.878755 15.993325 23.5975136 15.993325 38.5739738 0 15.052279-6.11457 28.6416995-15.993325 38.5695138l-.03568.0802788c-7.372271 7.3187525-16.7782734 12.5680955-27.2724993 14.8426625zm142.0176953-19.391796-.209617-.312195c-3.492129-5.882654-9.058127-9.802936-15.212837-11.502171-6.346487-1.672476-13.196946-.963346-19.284757 2.510943h.04014c-6.074431 3.447529-10.137431 9.093806-11.836666 15.417994-1.672476 6.270667-.941047 13.196946 2.551082 19.231237l.115958.160558c3.501049 5.954012 9.067047 9.950114 15.284196 11.56907 6.248368 1.752754 13.210326 1.021325 19.208938-2.479724l.325575-.156097c5.904954-3.527809 9.838616-9.093807 11.484332-15.208377 1.672475-6.297428 1.007945-13.196946-2.466344-19.231238z"
                fill={data.nodeColor}
              />
            </svg>
          </span>
        }
        {isConnectable && (
          <>
            <Handle
              type="source"
              position={Position.Right}
              isConnectable={isConnectable}
              className="custom-node-handle"
              style={{
                // transform: "translate(0px,-1px) ",
                position: "absolute",
                // width: "1px",
                // height: "40%",
                borderRadius: "50%",
                backgroundColor: data.nodeColor,
              }}
            />
            <Handle
              type="target"
              position={Position.Left}
              id="a"
              className="custom-node-handle"
              style={{
                // transform: "translate(0px,-1px) ",
                position: "absolute",
                // width: "1px",
                // height: "40%",
                borderRadius: "50%",
                backgroundColor: data.nodeColor,
              }}
              isConnectable={isConnectable}
            />
          </>
        )}
        <div
          style={{
            width: "80%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: darkmode ? "white" : "black",
            textAlign: "center",
          }}
        >
          <label
            title={isConnectable ? data.label : data?.nodeType}
            style={{
              // width:"100%",
              textAlign: "center",
              fontSize: "8px",
              color: darkmode ? "white" : "black",
              fontFamily: "monospace",
            }}
            htmlFor=""
          >
            {isConnectable ? data.label : data?.nodeType}
          </label>
        </div>
      </div>
    </div>
  );
}

export function PostgresNode({ data, isConnectable }) {
  const { darkmode, toggleDarkmode } = useContext(DarkmodeContext);
  return (
    <div className="custom-node-img">
      <div
        className="custom-node"
        style={{
          // border:  "1px solid"+ data.nodeColor,
          boxShadow: `  0 0 1px 1px ${data.nodeColor}`,
          backgroundColor: darkmode ? "transparent" : "#F1EFEF",
        }}
      >
        {
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "3px",
              marginBottom: "-5px",
            }}
          >
            <svg
              className="custom-node-img"
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              viewBox="0 0 24 24"
              id="postgresql"
              height="25px"
            >
              <polygon points="21.953 14.917 21.957 14.913 21.951 14.917 21.952 14.917"></polygon>
              <path
                fill={data.nodeColor}
                d="M18.991,14.727l0.002,0.002v0.001l-0.003,0.001c-0.145,0.053-0.265,0.075-0.366,0.12c-0.103,0.041-0.186,0.116-0.235,0.212l-0.001,0.002c-0.062,0.115-0.116,0.319-0.1,0.666c0.041,0.03,0.091,0.053,0.142,0.069l0.004,0.001c0.169,0.052,0.452,0.086,0.768,0.081c0.63-0.007,1.406-0.156,1.818-0.35c0.355-0.169,0.659-0.373,0.93-0.615c-1.376,0.288-2.153,0.211-2.63,0.012C19.196,14.875,19.087,14.808,18.991,14.727z"
              ></path>
              <polygon points="17.58 4.151 17.586 4.16 17.593 4.168"></polygon>
              <path
                fill={data.nodeColor}
                d="M12.317 19.299c-.001-.025 0-.051-.001-.076 0-.01-.001-.017-.001-.027L12.317 19.299zM11.262 14.886c-.058-.029-.126-.05-.199-.06H11.06v-.002h-.021c-.052.005-.128.023-.276.188-.344.39-.464.635-.748.864-.284.228-.652.35-1.388.503-.233.048-.367.101-.455.144.029.024.026.03.069.053.108.06.246.113.358.142.316.08.836.173 1.378.08.542-.094 1.106-.357 1.587-1.04.083-.118.092-.292.024-.479C11.52 15.092 11.368 14.931 11.262 14.886zM15.3 1.502l-.057.011c.019-.004.04-.006.059-.01C15.301 1.503 15.301 1.502 15.3 1.502zM18.082 6.9c-.671.009-1.047.184-1.245.413-.28.325-.306.895-.132 1.597.173.703.53 1.489.866 2.142.168.327.331.621.462.86.132.24.229.41.288.555.054.134.115.252.176.362.26-.555.306-1.1.28-1.668-.034-.703-.196-1.422-.172-2.15.027-.851.193-1.405.207-2.063C18.593 6.918 18.339 6.9 18.082 6.9zM18.206 7.406l-.001.008c0 .003 0 .006 0 .01 0 .046-.013.09-.036.126l.001-.001c-.031.057-.067.107-.109.15-.098.109-.229.185-.377.211L17.68 7.911c-.021.003-.045.004-.07.004-.126 0-.242-.04-.337-.108l.002.001c-.049-.034-.092-.073-.127-.117L17.147 7.69c-.031-.034-.053-.078-.062-.125V7.563c0-.005-.001-.01-.001-.015 0-.043.016-.083.043-.113.032-.037.07-.067.114-.089l.002-.001c.095-.054.223-.094.368-.116.054-.008.108-.012.158-.013v.003h.049c.065.002.125.009.178.022.053.012.099.03.136.055C18.169 7.321 18.197 7.359 18.206 7.406L18.206 7.406zM7.077 11.307c0-.18.014-.356.04-.529l-.002.019c.102-.739.116-1.43.104-1.976C7.207 8.289 7.169 7.935 7.169 7.714c0-.003 0-.006 0-.009 0-.003 0-.007 0-.01V7.69L7.168 7.684V7.683c0-.002 0-.003 0-.005 0-1.184.208-2.319.585-3.372C8.03 3.562 8.442 2.807 9.059 2.195 8.452 1.993 7.376 1.685 6.21 1.627c-.112-.006-.243-.01-.374-.01H5.835v.001c-.125 0-.251.004-.375.011C4.462 1.687 3.518 1.98 2.844 2.704 2.168 3.428 1.723 4.615 1.82 6.58c.019.372.179 1.414.453 2.652.275 1.238.662 2.695 1.128 3.982.467 1.287 1.033 2.407 1.571 2.937.271.265.506.372.719.363.214-.01.472-.135.787-.518.619-.754 1.204-1.421 1.808-2.069l-.02.021C7.536 13.303 7.077 12.36 7.077 11.307z"
              ></path>
              <path
                fill={data.nodeColor}
                d="M12.396 1.568V1.566c-1.168.003-2.005.36-2.641.895C9.1 3.014 8.661 3.771 8.372 4.546c-.343.92-.46 1.81-.507 2.414l.013-.008c.353-.2.816-.4 1.312-.516.496-.116 1.03-.151 1.514.039.484.19.884.637 1.029 1.315.695 3.257-.216 4.468-.552 5.382-.107.263-.218.601-.311.946l-.016.067c.042-.01.085-.022.127-.026.237-.02.423.06.533.108.338.142.57.44.695.78.033.089.056.185.07.284.013.034.02.074.02.115 0 .004 0 .008 0 .012-.016.5-.026 1.087-.026 1.677 0 .699.014 1.395.04 2.088.023.526.056.992.097 1.359.043.374.103.657.141.753.126.32.311.739.645 1.024.334.284.813.474 1.688.284.759-.165 1.227-.394 1.54-.723.313-.329.499-.787.618-1.488.179-1.05.538-4.095.582-4.668-.02-.432.043-.764.18-1.017.14-.26.358-.419.545-.505.094-.043.182-.072.254-.093-.088-.127-.167-.233-.249-.336l.009.011c-.259-.316-.48-.679-.647-1.07l-.011-.029c-.101-.209-.186-.367-.275-.522l.021.039c-.131-.24-.297-.54-.471-.877-.348-.675-.726-1.493-.923-2.29-.196-.796-.224-1.62.278-2.201.444-.516 1.225-.73 2.396-.61-.034-.105-.055-.192-.114-.332-.285-.67-.628-1.248-1.035-1.772-.993-1.282-2.598-2.551-5.076-2.592H12.396zM11.622 16.666c0 .012 0 .023 0 .035l0 0V16.666z"
              ></path>
              <polygon points="7.851 7.77 7.853 7.769 7.856 7.766"></polygon>
              <path
                fill={data.nodeColor}
                d="M14.231,0.421c0.017-0.005,0.035-0.007,0.051-0.011l0.02-0.006L14.231,0.421z"
              ></path>
              <polygon points="9.321 7.093 9.331 7.092 9.339 7.089"></polygon>
              <polygon points="10.047 7.391 10.045 7.391 10.045 7.391"></polygon>
              <path
                fill={data.nodeColor}
                d="M10.56,12.937c0.401-1.094,1.19-1.892,0.526-5.006c-0.109-0.51-0.324-0.716-0.62-0.832c-0.144-0.053-0.311-0.084-0.486-0.084c-0.011,0-0.023,0-0.034,0l0.002,0C9.735,7.017,9.529,7.044,9.331,7.092C8.911,7.198,8.541,7.348,8.197,7.54c-0.129,0.071-0.24,0.145-0.344,0.228L7.834,7.786c0.006,0.146,0.034,0.5,0.046,1.021c0.012,0.57-0.002,1.297-0.111,2.084c-0.236,1.71,0.99,3.126,2.43,3.128C10.284,13.668,10.422,13.312,10.56,12.937z M9.709,7.968L9.709,7.968C9.662,7.92,9.624,7.866,9.593,7.807L9.591,7.803C9.565,7.761,9.55,7.71,9.55,7.655c0-0.01,0.001-0.02,0.002-0.03v0.001C9.567,7.518,9.655,7.462,9.74,7.431C9.819,7.405,9.907,7.39,10.001,7.39c0.014,0,0.028,0,0.044,0.001l-0.001-0.004c0.052,0,0.108,0.005,0.164,0.013c0.151,0.021,0.286,0.062,0.388,0.122c0.051,0.028,0.095,0.063,0.13,0.105l0.001,0.001c0.034,0.039,0.054,0.09,0.054,0.147c0,0.008,0,0.016-0.001,0.024V7.798c-0.01,0.06-0.037,0.112-0.074,0.154c-0.041,0.05-0.087,0.093-0.139,0.129l-0.002,0.001C10.464,8.156,10.337,8.2,10.2,8.2c-0.027,0-0.054-0.002-0.08-0.005h0.003C9.957,8.167,9.815,8.085,9.709,7.968z"
              ></path>
              <path
                fill={data.nodeColor}
                d="M8.177 7.55c.007-.004.014-.006.02-.01C8.198 7.54 8.199 7.539 8.2 7.538L8.177 7.55zM18.115 3.752c.433.555.808 1.187 1.097 1.865l.021.055c.109.264.182.487.223.66.021.087.035.16.04.236.002.038.004.077-.012.144 0 .003-.005.01-.006.013.03.876-.185 1.47-.21 2.306-.02.606.133 1.318.171 2.095.036.73-.051 1.532-.52 2.319.04.048.075.096.113.144 1.239-1.975 2.132-4.16 2.608-6.023.255-1.003.39-1.912.402-2.632.01-.72-.123-1.242-.291-1.46-1.326-1.716-3.119-2.153-4.623-2.165V1.31h-.144c-.58.009-1.14.076-1.681.193C16.531 2.055 17.461 2.905 18.115 3.752z"
              ></path>
              <path
                fill={data.nodeColor}
                d="M12.561,0.258h-0.01C11.387,0.238,10.388,0.524,9.581,1C8.787,0.721,7.14,0.24,5.403,0.336C4.194,0.403,2.874,0.775,1.896,1.82C0.921,2.865,0.406,4.482,0.514,6.682c0.03,0.607,0.201,1.597,0.484,2.879c0.284,1.282,0.682,2.783,1.179,4.152c0.497,1.37,1.041,2.6,1.892,3.436c0.425,0.419,1.01,0.771,1.699,0.742c0.484-0.02,0.921-0.235,1.299-0.552c0.184,0.245,0.38,0.352,0.559,0.451C7.851,17.915,8.07,18,8.297,18.056c0.408,0.103,1.106,0.241,1.924,0.1c0.279-0.047,0.572-0.139,0.864-0.27c0.011,0.33,0.024,0.653,0.036,0.98c0.041,1.036,0.066,1.993,0.373,2.832c0.049,0.137,0.185,0.843,0.718,1.466c0.533,0.624,1.579,1.013,2.769,0.755c0.84-0.182,1.907-0.51,2.617-1.532c0.701-1.01,1.017-2.459,1.08-4.809c0.016-0.127,0.035-0.235,0.054-0.336l0.167,0.015h0.02c0.896,0.041,1.868-0.088,2.68-0.47c0.719-0.337,1.263-0.678,1.66-1.283c0.099-0.15,0.207-0.331,0.237-0.643c0.03-0.312-0.147-0.8-0.441-1.025c-0.588-0.452-0.957-0.28-1.353-0.197c-0.353,0.083-0.761,0.135-1.179,0.146h-0.008c1.142-1.947,1.961-4.015,2.428-5.845c0.277-1.08,0.432-2.076,0.444-2.947c0.013-0.871-0.057-1.642-0.573-2.309c-1.611-2.084-3.876-2.66-5.629-2.68c-0.054-0.001-0.109-0.002-0.163-0.001V0c-0.954,0.008-1.872,0.152-2.741,0.409L14.24,0.423C13.738,0.329,13.155,0.269,12.561,0.258z M14.93,0.895c0.612-0.151,1.316-0.242,2.04-0.251h0.006l0.001-0.004c1.658-0.016,3.775,0.455,5.296,2.422c0.342,0.442,0.444,1.088,0.432,1.884c-0.013,0.795-0.158,1.747-0.424,2.79c-0.516,2.02-1.49,4.375-2.862,6.488c0.045,0.033,0.097,0.062,0.151,0.084l0.005,0.002c0.286,0.12,0.939,0.223,2.242-0.048c0.328-0.07,0.568-0.117,0.817,0.075c0.112,0.096,0.182,0.238,0.182,0.397c0,0.01,0,0.02-0.001,0.03v-0.001c-0.015,0.127-0.06,0.241-0.129,0.336c-0.252,0.383-0.749,0.746-1.385,1.045c-0.564,0.266-1.373,0.405-2.09,0.413c-0.36,0.004-0.691-0.024-0.973-0.113l-0.018-0.007c-0.109,1.06-0.359,3.153-0.522,4.108c-0.13,0.77-0.358,1.382-0.794,1.84c-0.435,0.458-1.05,0.734-1.878,0.914c-1.025,0.223-1.773-0.017-2.255-0.428c-0.481-0.41-0.701-0.954-0.834-1.287c-0.091-0.23-0.138-0.528-0.184-0.926s-0.079-0.885-0.102-1.434c-0.022-0.558-0.034-1.214-0.034-1.873c0-0.217,0.002-0.433,0.004-0.65c-0.413,0.384-0.935,0.654-1.515,0.757l-0.018,0.003c-0.681,0.117-1.288,0.002-1.651-0.09c-0.193-0.049-0.361-0.118-0.519-0.204c-0.166-0.09-0.324-0.193-0.43-0.394c-0.042-0.077-0.067-0.17-0.067-0.268c0-0.039,0.004-0.078,0.012-0.114c0.036-0.134,0.111-0.248,0.214-0.328l0.001-0.001c0.196-0.161,0.454-0.251,0.845-0.333c0.71-0.148,0.958-0.249,1.109-0.37c0.128-0.104,0.274-0.314,0.53-0.622c-0.001-0.009-0.002-0.024-0.003-0.038v-0.003c-0.484-0.014-0.935-0.145-1.329-0.366l0.015,0.008c-0.148,0.158-0.905,0.968-1.827,2.092c-0.388,0.47-0.817,0.74-1.269,0.759s-0.861-0.211-1.209-0.552c-0.695-0.683-1.249-1.858-1.732-3.186c-0.482-1.328-0.874-2.807-1.153-4.067c-0.28-1.26-0.444-2.276-0.468-2.766c-0.104-2.082,0.377-3.485,1.202-4.37c0.826-0.885,1.958-1.22,3.061-1.284c1.981-0.115,3.861,0.584,4.242,0.734C10.396,1.194,11.341,0.88,12.52,0.9c0.594,0.009,1.165,0.088,1.711,0.229l-0.05-0.011l0.02-0.009c0.191-0.072,0.435-0.145,0.685-0.205L14.93,0.895z"
              ></path>
            </svg>
          </span>
        }
        {isConnectable && (
          <>
            <Handle
              type="source"
              position={Position.Right}
              isConnectable={isConnectable}
              className="custom-node-handle"
              style={{
                // transform: "translate(0px,-1px) ",
                position: "absolute",
                // width: "1px",
                // height: "40%",
                borderRadius: "50%",
                backgroundColor: data.nodeColor,
              }}
            />
            <Handle
              type="target"
              position={Position.Left}
              id="a"
              className="custom-node-handle"
              style={{
                // transform: "translate(0px,-1px) ",
                position: "absolute",
                // width: "1px",
                // height: "40%",
                borderRadius: "50%",
                backgroundColor: data.nodeColor,
              }}
              isConnectable={isConnectable}
            />
          </>
        )}
        <div
          style={{
            width: "80%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: darkmode ? "white" : "black",
            textAlign: "center",
          }}
        >
          <label
            title={isConnectable ? data.label : data?.nodeType}
            style={{
              // width:"100%",
              textAlign: "center",
              fontSize: "8px",
              color: darkmode ? "white" : "black",
              fontFamily: "monospace",
            }}
            htmlFor=""
          >
            {isConnectable ? data.label : data?.nodeType}
          </label>
        </div>
      </div>
    </div>
  );
}

export function DockerNode({ data, isConnectable }) {
  const { darkmode, toggleDarkmode } = useContext(DarkmodeContext);
  return (
    <div className="custom-node-img">
      <div
        className="custom-node"
        style={{
          border: "1px solid" + data.nodeColor,
          backgroundColor: darkmode ? "transparent" : "#F1EFEF",
          // boxShadow: `  0 0 10px 1px ${data.nodeColor}`,
        }}
      >
        {
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "3px",
              marginBottom: "-5px",
            }}
          >
            <svg
              className="custom-node-img"
              xmlns="http://www.w3.org/2000/svg"
              height="27"
              enable-background="new 0 0 24 24"
              viewBox="0 0 24 24"
              id="docker"
            >
              <polygon
                fill={data.nodeColor}
                points="1.862 11.247 4.34 11.247 4.34 8.994 4.337 8.994 1.862 8.994"
              ></polygon>
              <path
                fill={data.nodeColor}
                d="M23.682,11.038c0.056-0.095,0.247-0.501,0.318-0.649l-0.498-0.338v0.001c-0.54-0.368-1.785-0.501-2.741-0.319c-0.124-0.911-0.626-1.704-1.541-2.417l-0.525-0.353l-0.349,0.531c-0.69,1.055-0.877,2.792-0.138,3.938c-0.326,0.178-0.967,0.421-1.815,0.406h-16.3c-0.326,1.927,0.218,4.431,1.65,6.15C3.133,19.654,5.218,20.5,7.944,20.5c5.902,0,10.27-2.75,12.314-7.747C21.06,12.768,22.793,12.757,23.682,11.038z"
              ></path>
              <rect
                fill={data.nodeColor}
                width="2.478"
                height="2.253"
                x="4.787"
                y="8.994"
              ></rect>
              <rect
                fill={data.nodeColor}
                width="2.478"
                height="2.253"
                x="7.716"
                y="8.994"
              ></rect>
              <rect
                fill={data.nodeColor}
                width="2.478"
                height="2.253"
                x="13.576"
                y="8.994"
              ></rect>
              <rect
                fill={data.nodeColor}
                width="2.478"
                height="2.28"
                x="4.787"
                y="6.258"
              ></rect>
              <rect
                fill={data.nodeColor}
                width="2.478"
                height="2.253"
                x="10.644"
                y="8.998"
              ></rect>
              <rect
                fill={data.nodeColor}
                width="2.478"
                height="2.28"
                x="10.644"
                y="6.258"
              ></rect>
              <rect
                fill={data.nodeColor}
                width="2.478"
                height="2.303"
                x="10.644"
                y="3.5"
              ></rect>
              <rect
                fill={data.nodeColor}
                width="2.478"
                height="2.28"
                x="7.716"
                y="6.258"
              ></rect>
            </svg>
          </span>
        }
        {isConnectable && (
          <>
            <Handle
              type="source"
              position={Position.Right}
              isConnectable={isConnectable}
              className="custom-node-handle"
              style={{
                // transform: "translate(0px,-1px) ",
                position: "absolute",
                // width: "1px",
                // height: "40%",
                borderRadius: "50%",
                backgroundColor: data.nodeColor,
              }}
            />
            <Handle
              type="target"
              position={Position.Left}
              id="a"
              className="custom-node-handle"
              style={{
                // transform: "translate(0px,-1px) ",
                position: "absolute",
                // width: "1px",
                // height: "40%",
                borderRadius: "50%",
                backgroundColor: data.nodeColor,
              }}
              isConnectable={isConnectable}
            />
          </>
        )}
        <div
          style={{
            width: "80%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: darkmode ? "white" : "black",
            textAlign: "center",
          }}
        >
          <label
            title={isConnectable ? data.label : data?.nodeType}
            style={{
              // width:"100%",
              textAlign: "center",
              fontSize: "8px",
              color: darkmode ? "white" : "black",
              fontFamily: "monospace",
            }}
            htmlFor=""
          >
            {isConnectable ? data.label : data?.nodeType}
          </label>
        </div>
      </div>
    </div>
  );
}

export function InputNode({ data, isConnectable }) {
  const { darkmode, toggleDarkmode } = useContext(DarkmodeContext);
  return (
    <div className="custom-node-img">
      <div
        className="custom-node"
        style={{
          border: "1px solid" + data.nodeColor,
          backgroundColor: darkmode ? "transparent" : "#F1EFEF",
          // boxShadow: `  0 0 10px 1px ${data.nodeColor}`,
        }}
      >
        {
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "3px",
              marginBottom: "-5px",
            }}
          >
            <svg
              className="custom-node-img"
              height="30px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6H20C21.1046 6 22 6.89543 22 8V16C22 17.1046 21.1046 18 20 18H4C2.89543 18 2 17.1046 2 16V8C2 6.89543 2.89543 6 4 6Z"
                stroke={data.nodeColor}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5 8.5H6.5M8 8.5H6.5M6.5 8.5V15.5M6.5 15.5H5M6.5 15.5H8"
                stroke={data.nodeColor}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        }
        {isConnectable && (
          <>
            <Handle
              type="source"
              position={Position.Right}
              isConnectable={isConnectable}
              className="custom-node-handle"
              style={{
                // transform: "translate(0px,-1px) ",
                position: "absolute",
                // width: "1px",
                // height: "40%",
                borderRadius: "50%",
                backgroundColor: data.nodeColor,
              }}
            />
            <Handle
              type="target"
              position={Position.Left}
              id="a"
              className="custom-node-handle"
              style={{
                // transform: "translate(0px,-1px) ",
                position: "absolute",
                // width: "1px",
                // height: "40%",
                borderRadius: "50%",
                backgroundColor: data.nodeColor,
              }}
              isConnectable={isConnectable}
            />
          </>
        )}
        <div
          style={{
            width: "80%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: darkmode ? "white" : "black",
            textAlign: "center",
          }}
        >
          <label
            title={isConnectable ? data.label : data?.nodeType}
            style={{
              // width:"100%",
              textAlign: "center",
              fontSize: "8px",
              color: darkmode ? "white" : "black",
              fontFamily: "monospace",
            }}
            htmlFor=""
          >
            {isConnectable ? data.label : data?.nodeType}
          </label>
        </div>
      </div>
    </div>
  );
}

export function OutputNode({ data, isConnectable }) {
  const { darkmode, toggleDarkmode } = useContext(DarkmodeContext);
  return (
    <div className="custom-node-img">
      <div
        className="custom-node"
        style={{
          border: "1px solid" + data.nodeColor,
          backgroundColor: darkmode ? "transparent" : "#F1EFEF",
          // boxShadow: `  0 0 10px 1px ${data.nodeColor}`,
        }}
      >
        {
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "3px",
              marginBottom: "-5px",
            }}
          >
            <svg
              className="custom-node-img"
              height="30px"
              viewBox="0 0 60 60"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title />

              <g data-name="Layer 2" id="Layer_2">
                <g id="Icons">
                  <g id="Development">
                    <rect class="cls-1" fill="none" height="60" width="60" />

                    <circle
                      class="cls-2"
                      fill={data.nodeColor}
                      cx="9.33"
                      cy="15.74"
                      r="1"
                    />

                    <circle
                      class="cls-2"
                      fill={data.nodeColor}
                      cx="16"
                      cy="15.74"
                      r="1"
                    />

                    <circle
                      class="cls-2"
                      fill={data.nodeColor}
                      cx="12.67"
                      cy="15.74"
                      r="1"
                    />

                    <path
                      class="cls-2"
                      fill={data.nodeColor}
                      d="M20,30.25l3-3a1,1,0,1,0-1.42-1.42l-3.72,3.73a1,1,0,0,0,0,1.41l3.72,3.73a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.41Z"
                    />

                    <path
                      class="cls-2"
                      fill={data.nodeColor}
                      d="M34.32,34.68a1,1,0,0,0,1.41,0L39.46,31a1,1,0,0,0,0-1.41l-3.73-3.73a1,1,0,0,0-1.41,1.42l3,3-3,3A1,1,0,0,0,34.32,34.68Z"
                    />

                    <path
                      class="cls-2"
                      fill={data.nodeColor}
                      d="M31,26.15a1,1,0,0,0-1.37.37L25.94,33a1,1,0,1,0,1.73,1l3.73-6.45A1,1,0,0,0,31,26.15Z"
                    />

                    <path
                      class="cls-2"
                      fill={data.nodeColor}
                      d="M55.86,40a.29.29,0,0,1-.27-.19,10.43,10.43,0,0,0-1.67-2.89.29.29,0,0,1,0-.33,2.3,2.3,0,0,0-.84-3.14L52.33,33V14.74a3,3,0,0,0-3-3H8a3,3,0,0,0-3,3V40.08a2.34,2.34,0,0,0,2.33,2.33H21l-1,3.7H18.67a4.33,4.33,0,0,0-4.21,3.33H12a1,1,0,0,0,0,2H37.47a2.12,2.12,0,0,0,.07.71,2.25,2.25,0,0,0,1.07,1.4l2.11,1.22a2.3,2.3,0,0,0,3.14-.85.31.31,0,0,1,.31-.14,9.74,9.74,0,0,0,3.32,0,.3.3,0,0,1,.31.15,2.3,2.3,0,0,0,2,1.14,2.27,2.27,0,0,0,1.15-.3l2.11-1.22a2.29,2.29,0,0,0,1.07-1.4,2.26,2.26,0,0,0-.23-1.74.3.3,0,0,1,0-.34,10.52,10.52,0,0,0,1.67-2.88.28.28,0,0,1,.27-.19,2.31,2.31,0,0,0,2.3-2.3V42.26A2.3,2.3,0,0,0,55.86,40ZM7,14.74a1,1,0,0,1,1-1H49.33a1,1,0,0,1,1,1v3H7Zm.33,25.67A.33.33,0,0,1,7,40.08V19.74H50.33V32A2.29,2.29,0,0,0,47.8,33h0a.29.29,0,0,1-.3.13,10.27,10.27,0,0,0-3.32,0,.28.28,0,0,1-.3-.13h0a2.29,2.29,0,0,0-3.14-.84l-2.11,1.22a2.24,2.24,0,0,0-1.07,1.39,2.32,2.32,0,0,0,.22,1.75.27.27,0,0,1,0,.33,10.43,10.43,0,0,0-1.67,2.89.29.29,0,0,1-.27.19,2.29,2.29,0,0,0-1.36.45ZM34,46.11H22l1-3.7H33.5V44.7A2.32,2.32,0,0,0,34,46.11Zm-15.32,2H36.48a11,11,0,0,0,.78,1.33H16.57A2.33,2.33,0,0,1,18.67,48.11ZM56.16,44.7a.3.3,0,0,1-.3.3,2.31,2.31,0,0,0-2.15,1.48,8.46,8.46,0,0,1-1.34,2.33,2.31,2.31,0,0,0-.21,2.6.26.26,0,0,1,0,.22.29.29,0,0,1-.14.19L49.94,53a.3.3,0,0,1-.41-.12,2.31,2.31,0,0,0-2.37-1.11,7.92,7.92,0,0,1-2.66,0,2.31,2.31,0,0,0-2.37,1.12.31.31,0,0,1-.41.11l-2.11-1.22a.29.29,0,0,1-.14-.19.26.26,0,0,1,0-.22,2.33,2.33,0,0,0-.21-2.6,8.35,8.35,0,0,1-1.35-2.33A2.28,2.28,0,0,0,35.8,45a.3.3,0,0,1-.3-.3V42.26a.29.29,0,0,1,.3-.3,2.3,2.3,0,0,0,2.14-1.48,8.21,8.21,0,0,1,1.35-2.33,2.33,2.33,0,0,0,.21-2.6.28.28,0,0,1,0-.23.26.26,0,0,1,.14-.18l2.11-1.22a.28.28,0,0,1,.15,0,.3.3,0,0,1,.25.14h0a2.32,2.32,0,0,0,2.37,1.12,7.92,7.92,0,0,1,2.66,0A2.33,2.33,0,0,0,49.53,34h0a.29.29,0,0,1,.4-.1l2.11,1.22a.26.26,0,0,1,.14.18.28.28,0,0,1,0,.23,2.3,2.3,0,0,0,.21,2.59,8.51,8.51,0,0,1,1.34,2.34A2.32,2.32,0,0,0,55.86,42a.29.29,0,0,1,.3.3Z"
                    />

                    <path
                      class="cls-2"
                      fill={data.nodeColor}
                      d="M45.83,38.94a4.54,4.54,0,1,0,4.54,4.54A4.54,4.54,0,0,0,45.83,38.94Zm0,7.08a2.54,2.54,0,1,1,2.54-2.54A2.54,2.54,0,0,1,45.83,46Z"
                    />
                  </g>
                </g>
              </g>
            </svg>
          </span>
        }
        {isConnectable && (
          <>
            <Handle
              type="source"
              position={Position.Right}
              isConnectable={isConnectable}
              className="custom-node-handle"
              style={{
                // transform: "translate(0px,-1px) ",
                position: "absolute",
                // width: "1px",
                // height: "40%",
                borderRadius: "50%",
                backgroundColor: data.nodeColor,
              }}
            />
            <Handle
              type="target"
              position={Position.Left}
              id="a"
              className="custom-node-handle"
              style={{
                // transform: "translate(0px,-1px) ",
                position: "absolute",
                // width: "1px",
                // height: "40%",
                borderRadius: "50%",
                backgroundColor: data.nodeColor,
              }}
              isConnectable={isConnectable}
            />
          </>
        )}
        <div
          style={{
            width: "80%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: darkmode ? "white" : "black",
            textAlign: "center",
          }}
        >
          <label
            title={isConnectable ? data.label : data?.nodeType}
            style={{
              fontSize: "8px",
              color: darkmode ? "white" : "black",
              fontFamily: "monospace",
            }}
            htmlFor=""
          >
            {isConnectable ? data.label : data?.nodeType}
          </label>
        </div>
      </div>
    </div>
  );
}
