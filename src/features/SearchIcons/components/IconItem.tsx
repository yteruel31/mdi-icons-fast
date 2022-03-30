import { Tooltip, ActionIcon, Popover, Anchor } from "@mantine/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { IconDto } from "../../../store/api/dtos/icon.dto";

const IconItem: React.FC<{ icon: IconDto }> = (props) => {
  const { icon } = props;
  const [visible, setVisible] = useState(false);
  const [svgLink, setSvgLink] = useState<string>();

  useEffect(() => {
    if (visible) {
      axios
        .get<string>(`${process.env.REACT_APP_API_URL}/icons/${icon.id}/base64`)
        .then((res) => setSvgLink(res.data));
    }
  }, [visible]);

  return (
    <>
      <Popover
        opened={visible}
        closeOnClickOutside
        onClose={() => setVisible(false)}
        target={
          <Tooltip label={icon.name}>
            <ActionIcon size="xl" onClick={() => setVisible((m) => !m)}>
              <svg
                style={{ width: "24px", height: "24px" }}
                viewBox="0 0 24 24"
              >
                <path fill="currentColor" d={icon.data} />
              </svg>
            </ActionIcon>
          </Tooltip>
        }
      >
        <Anchor target="_self" download={`${icon.name}.svg`} href={svgLink}>
          Download SVG
        </Anchor>
      </Popover>
    </>
  );
};

export default IconItem;
