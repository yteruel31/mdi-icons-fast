import {
  Tooltip,
  ActionIcon,
  Popover,
  Anchor,
  Button,
  Stack,
} from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { IconDto } from "../../../store/api/dtos/icon.dto";
import { toCamelCase } from "../../../utils";

const IconItem: React.FC<{ icon: IconDto }> = (props) => {
  const { icon } = props;
  const [visible, setVisible] = useState(false);
  const [svgLink, setSvgLink] = useState<string>();
  const clipboard = useClipboard();
  const mdiNames = [
    icon.name,
    `mdi-${icon.name}`,
    toCamelCase(icon.name),
    toCamelCase("mdi-" + icon.name),
  ];

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
            <ActionIcon size={70} onClick={() => setVisible((m) => !m)}>
              <svg
                style={{ width: "35px", height: "35px" }}
                viewBox="0 0 24 24"
              >
                <path fill="currentColor" d={icon.data} />
              </svg>
            </ActionIcon>
          </Tooltip>
        }
      >
        <Stack align="center">
          {mdiNames.map((name) => (
            <Tooltip label="Copy to clipboard">
              <Button
                variant="light"
                radius="xl"
                onClick={() => {
                  clipboard.copy(name);
                  showNotification({
                    title: "Copied",
                    message: "",
                    color: "green",
                  });
                }}
                compact
              >
                {name}
              </Button>
            </Tooltip>
          ))}
          <Anchor target="_self" download={`${icon.name}.svg`} href={svgLink}>
            Download SVG
          </Anchor>
        </Stack>
      </Popover>
    </>
  );
};

export default IconItem;
