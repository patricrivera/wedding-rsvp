import React from "react";
import {
  ActionIcon,
  Button,
  Grid,
  Group as MGroup,
  Select,
  Switch,
  TextInput,
  Title,
} from "@mantine/core";
import { Group, RelationshipType } from "../../../../types/Guest";
import { UseFormReturnType } from "@mantine/form";
import { IconX } from "@tabler/icons";
import { addChildToGuests, addPartnerToGuests } from "./util";

interface Props {
  form: UseFormReturnType<Group>;
  index: number;
  groupType: string;
}

const GuestInput = (props: Props): JSX.Element => {
  const { form, groupType, index } = props;
  const { CHILD, PARTNER, PRIMARY } = RelationshipType;
  const [nameUnknown, setNameUnknown] = React.useState(false);
  const { guests } = form.values;
  const guest = guests[index];
  const firstChildInGroupIndex = guests.findIndex(
    (guest) => guest.relationshipType === CHILD,
  );
  const showAddPlusOneButton =
    guests.filter((guest) => guest.relationshipType === PARTNER).length === 0;

  return (
    <>
      {firstChildInGroupIndex === index && (
        <Title
          order={4}
          size="h3"
          sx={(theme): Record<string, string> => ({ fontFamily: `Poppins, sans-serif` })}
          weight={900}
          align="left"
          id="rsvp"
          mt="lg"
        >
          Children
        </Title>
      )}

      <Grid>
        <Grid.Col span={2}>
          {guest.relationshipType !== CHILD && (
            <Select
              label={index === 0 ? "Title" : ""}
              placeholder="Select..."
              name="title"
              allowDeselect
              disabled={nameUnknown}
              data={[
                { value: "Mr.", label: "Mr." },
                { value: "Mrs.", label: "Mrs." },
                { value: "Ms.", label: "Ms." },
                { value: "Miss", label: "Miss" },
                { value: "Mx.", label: "Mx." },
                { value: "Dr.", label: "Dr." },
              ]}
              {...form.getInputProps(`guests.${index}.title`)}
            />
          )}
          {guest.relationshipType === CHILD && <TextInput value="Child" disabled />}
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput
            label={index === 0 ? "First Name" : ""}
            placeholder={nameUnknown ? "" : "First Name"}
            disabled={nameUnknown}
            name="firstName"
            required
            {...form.getInputProps(`guests.${index}.firstName`)}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput
            label={index === 0 ? "Last Name" : ""}
            placeholder={nameUnknown ? "" : "Last Name"}
            disabled={nameUnknown}
            name="lastName"
            required
            {...form.getInputProps(`guests.${index}.lastName`)}
          />
        </Grid.Col>
        <Grid.Col span={2}>
          {index !== 0 && (
            <MGroup>
              <ActionIcon onClick={(): void => form.removeListItem("guests", index)}>
                <IconX size="1.125rem" />
              </ActionIcon>
            </MGroup>
          )}
        </Grid.Col>
      </Grid>
      {guest.relationshipType === PRIMARY && showAddPlusOneButton && (
        <Button
          variant="outline"
          onClick={(): void => addPartnerToGuests(form)}
          mt="lg"
          mr="md"
        >
          Add Plus One
        </Button>
      )}
      {index > 0 && guest.relationshipType !== PRIMARY && (
        <Switch
          mt="lg"
          label="Name Unknown"
          onChange={(event): void => setNameUnknown(event.currentTarget.checked)}
        />
      )}
      {index === guests.length - 1 && groupType === "family" && (
        <Button variant="outline" onClick={(): void => addChildToGuests(form)} mt="lg">
          Add Child
        </Button>
      )}
    </>
  );
};

export default GuestInput;
