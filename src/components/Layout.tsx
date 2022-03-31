import {
  AppShell,
  Header,
  Title,
  Container,
  Footer,
  Group,
  Text,
  Anchor,
  ActionIcon,
} from "@mantine/core";
import { mdiGithub, mdiHeart } from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <AppShell
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
      fixed
      header={
        <Header height={50}>
          <Group position="apart" mx={20}>
            <Title>Mdi Icons Fast</Title>
            <ActionIcon<"a">
              component="a"
              size="xl"
              href="https://github.com/yteruel31/mdi-icons-fast"
              target="_blank"
            >
              <Icon path={mdiGithub} size={1.5} />
            </ActionIcon>
          </Group>
        </Header>
      }
      footer={
        <Footer
          height={40}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>Created with </Text>
            <Icon
              style={{ margin: "0 2px 0 2px" }}
              path={mdiHeart}
              color="pink"
              size={0.7}
            />{" "}
            <Text mr={5}> by</Text>
            <Anchor target="_blank" href="https://twitter.com/YoannTeruel">
              @YoannTERUEL
            </Anchor>
          </div>
        </Footer>
      }
    >
      <Container sx={{ width: "100%" }}>
        <Outlet />
      </Container>
    </AppShell>
  );
};

export default Layout;
