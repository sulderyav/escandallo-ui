import React, { FC, useState, useEffect } from "react";
import { Box, Button, Tooltip } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ContentCopy, LibraryAddCheck } from "@mui/icons-material";

export const CopyToClipboardC: FC<{
  value: string;
}> = ({ value, children }) => {
  const [state, setState] = useState({
    value: value ? value.trim() : "",
    copied: false,
  });

  useEffect(() => {
    // After 3 seconds, the "Copiado!" message is gonna dissapear
    if (state.copied)
      setTimeout(() => {
        setState({ ...state, copied: false });
      }, 1000);
  }, [state]);

  return (
    <Box>
      <CopyToClipboard
        text={state.value}
        onCopy={() => setState({ ...state, copied: true })}
      >
        <Tooltip title={state.copied ? "Copiado" : "Copiar"} arrow>
          <Button
            sx={{
              mr: 2,
            }}
            style={{
              padding: "0",
            }}
            variant="text"
            type="reset"
          >
            {state.copied ? <LibraryAddCheck /> : <ContentCopy />}
          </Button>
        </Tooltip>
      </CopyToClipboard>
      {children}
    </Box>
  );
};
