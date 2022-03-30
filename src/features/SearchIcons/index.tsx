import {
  TextInput,
  Pagination,
  SimpleGrid,
  Loader,
  ActionIcon,
  Card,
  Group,
  useMantineTheme,
} from "@mantine/core";
import React, { useState } from "react";
import { useSearchIconsQuery } from "../../store/api/icons.api";
import IconItem from "./components/IconItem";

function SearchIcons() {
  const theme = useMantineTheme();
  const [activePage, setPage] = useState(1);
  const [query, setQuery] = useState<string>();
  const { data, isLoading } = useSearchIconsQuery({
    skip: activePage - 1,
    take: 150,
    name: query,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <TextInput
        icon={
          <svg style={{ width: "24px", height: "24px" }} viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
            />
          </svg>
        }
        mb={15}
        radius="xl"
        size="md"
        rightSection={
          <ActionIcon
            size={32}
            radius="xl"
            color={theme.primaryColor}
            variant="filled"
          >
            {theme.dir === "ltr" ? (
              <svg
                style={{ width: "24px", height: "24px" }}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"
                />
              </svg>
            ) : (
              <svg
                style={{ width: "24px", height: "24px" }}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"
                />
              </svg>
            )}
          </ActionIcon>
        }
        placeholder="Search icons"
        rightSectionWidth={42}
        onChange={(e) => setQuery(e.currentTarget.value)}
      />
      <Card>
        <SimpleGrid
          cols={15}
          breakpoints={[
            { maxWidth: 980, cols: 3, spacing: "md" },
            { maxWidth: 755, cols: 2, spacing: "sm" },
            { maxWidth: 600, cols: 5, spacing: "sm" },
          ]}
        >
          {data?.result.map((x) => (
            <IconItem icon={x} />
          ))}
        </SimpleGrid>
      </Card>
      <Group mt={15} position="center">
        <Pagination
          page={activePage}
          onChange={setPage}
          total={data?.total as number}
        />
      </Group>
    </>
  );
}

export default SearchIcons;
