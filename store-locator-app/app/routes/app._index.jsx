import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  Box,
  InlineStack,
} from "@shopify/polaris";
import { useNavigate } from "@remix-run/react";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function Index() {
  const navigate = useNavigate();
  return (
    <Page>
      <TitleBar title="Store Locator" />
      <Box paddingBlockStart="400" paddingBlockEnd="200">
        <InlineStack align="end">
          {/* <Button variant="primary" onClick={() => navigate("/app/add-location")}>
            Add Location
          </Button> */}
          <Button variant="primary" url="/add-location">
            Add Location
          </Button>

        </InlineStack>
      </Box>
      <Layout>
        <Layout.Section>
          <Card>
            <Text variant="bodyMd">
              This is where you can manage store locations.
            </Text>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
