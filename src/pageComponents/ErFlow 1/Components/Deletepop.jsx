import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React from "react";

const Deletepop = ({ deletepop, setDeletepop, id, node, deleteNode }) => {
  return (
    <div>
      <Dialog
        header={`${node?.data.label}`}
        headerStyle={{
          height: "40px",
          textAlign: "center",
          textTransform: "capitalize",
        }}
        visible={deletepop}
        onHide={() => setDeletepop(false)}
        width={50}
        closable={false}
        style={{ borderRadius: "10px", top: "-20%" }}
      >
        <div>
          <span style={{ color: "#36454F", marginBottom: "40px" }}>
            Are you sure you want to delete this Node
          </span>
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "40px",
            }}
          >
            <Button onClick={() => deleteNode(id, node)}>Confrim delete</Button>
            <Button onClick={() => setDeletepop(false)}>Discard</Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Deletepop;
