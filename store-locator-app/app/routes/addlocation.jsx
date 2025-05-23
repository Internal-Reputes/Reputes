import {
  Page,
  Layout,
  Card,
  TextField,
  Button,
  BlockStack,
  InlineStack,
} from "@shopify/polaris";
import { useState } from "react";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function AddLocation() {
  const [formData, setFormData] = useState({
    name: "",
    address1: "",
    address2: "",
    city: "",
    zip: "",
    state: "",
    country: "",
    phone: "",
    website: "",
    email: "",
  });

  const handleChange = (field) => (value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/add-location", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        console.log("Data saved successfully:", result.insertedId);
        // Optional: Clear the form or show a success toast here
      } else {
        console.error("Save failed:", result.error);
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <Page>
      <TitleBar title="Add Store Location" />
      <Layout>
        <Layout.Section>
          <Card title="Basic Information">
            <BlockStack gap="400">
              <TextField
                label="Name"
                value={formData.name}
                onChange={handleChange("name")}
                placeholder="e.g. Fred's Flowers"
              />
              <TextField
                label="Address line 1"
                value={formData.address1}
                onChange={handleChange("address1")}
              />
              <TextField
                label="Address line 2"
                value={formData.address2}
                onChange={handleChange("address2")}
              />
              <InlineStack gap="400" wrap={false}>
                <TextField
                  label="City"
                  value={formData.city}
                  onChange={handleChange("city")}
                />
                <TextField
                  label="Postal / ZIP code"
                  value={formData.zip}
                  onChange={handleChange("zip")}
                />
              </InlineStack>
              <InlineStack gap="400" wrap={false}>
                <TextField
                  label="State / Province"
                  value={formData.state}
                  onChange={handleChange("state")}
                />
                <TextField
                  label="Country"
                  value={formData.country}
                  onChange={handleChange("country")}
                />
              </InlineStack>
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card title="Details">
            <BlockStack gap="400">
              <TextField
                label="Phone number"
                value={formData.phone}
                onChange={handleChange("phone")}
                placeholder="e.g. (555) 123-4567"
              />
              <TextField
                label="Website"
                value={formData.website}
                onChange={handleChange("website")}
                placeholder="e.g. http://example.com"
              />
              <TextField
                label="Email address"
                value={formData.email}
                onChange={handleChange("email")}
                placeholder="e.g. store@example.com"
              />
              <Button variant="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
