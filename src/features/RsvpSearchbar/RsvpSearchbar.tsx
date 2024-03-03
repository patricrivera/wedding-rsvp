"use client";

import { Button, Group as MGroup, TextInput, Text, Skeleton } from "@mantine/core";
import { useForm, isNotEmpty } from "@mantine/form";
import { useState } from "react";
import useSWR from "swr";
import SearchResults from "./components/SearchResults";
import { Group } from "@spiel-wedding/types/Guest";

interface SearchForm {
  firstName: string;
  lastName: string;
}

const getMatchingGuests = async (
  firstName: string,
  lastName: string
): Promise<Group[]> => {
  const result = await fetch(
    `/api/searchResult?firstName=${firstName}&lastName=${lastName}`
  ).then((res) => res.json());

  if (result.length === 0) {
    const error = {
      info: `Hm... we can't find your name. Make sure you enter your name exactly as it appears on your invitation.`,
      status: 400,
    };
    throw error;
  }

  return result;
};

interface Props {
  selectedGroup?: Group;
  setSelectedGroup: (group: Group) => void;
}

const RsvpSearchbar = ({ selectedGroup, setSelectedGroup }: Props) => {
  const [searchForm, setSearchForm] = useState<SearchForm>();
  const { data, error, isLoading, mutate } = useSWR(
    searchForm ? ["searchResults", searchForm] : null,
    ([url, params]) => getMatchingGuests(params.firstName, params.lastName)
  );

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
    },
    validate: {
      firstName: isNotEmpty("Please enter a first name"),
      lastName: isNotEmpty("Please enter a last name"),
    },
  });

  const handleSubmit = (values: SearchForm) => {
    setSearchForm(values);
    mutate();
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <MGroup pb="lg" align="end">
          <TextInput
            label="First name"
            placeholder="First name"
            {...form.getInputProps("firstName")}
          />

          <TextInput
            label="Last name"
            placeholder="Last name"
            {...form.getInputProps("lastName")}
          />

          <Button type="submit" disabled={!form.isValid()} className="primaryButton">
            Search
          </Button>
        </MGroup>
      </form>

      {error && (
        <Text c="red" fz="sm">
          {error.info}
        </Text>
      )}

      {isLoading && (
        <>
          <Skeleton w="100%" h={25} />

          <Skeleton w="100%" h={25} my="md" />

          <Skeleton w="100%" h={25} />
        </>
      )}

      {selectedGroup === undefined && (data ?? []).length > 0 && (
        <Text>Select your info below or try searching again.</Text>
      )}

      <SearchResults searchResults={data ?? []} setSelectedGroup={setSelectedGroup} />
    </>
  );
};

export default RsvpSearchbar;