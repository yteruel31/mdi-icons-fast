import { AppShell, Header, Title, Container } from "@mantine/core";
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
      header={
        <Header height={50}>
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <Title>Mdi Icons Fast</Title>
          </div>
        </Header>
      }
    >
      <Container>
        <Outlet />
      </Container>
    </AppShell>
  );
};

export default Layout;
