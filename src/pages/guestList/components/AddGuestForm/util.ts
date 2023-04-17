import { UseFormReturnType } from "@mantine/form";
import { RsvpResonse, RelationshipType, Group } from "../../../../types/Guest";

const addPartnerToGuests = (form: UseFormReturnType<Group>): void => {
  form.insertListItem(
    "guests",
    {
      firstName: "",
      lastName: "",
      rsvp: RsvpResonse.NO_RESPONSE,
      relationshipType: RelationshipType.PARTNER,
    },
    1,
  );
};

const addChildToGuests = (form: UseFormReturnType<Group>): void => {
  form.insertListItem("guests", {
    firstName: "",
    lastName: "",
    rsvp: RsvpResonse.NO_RESPONSE,
    relationshipType: RelationshipType.CHILD,
  });
};

export { addPartnerToGuests, addChildToGuests };