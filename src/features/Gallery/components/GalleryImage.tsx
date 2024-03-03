"use client";

import { Flex, Paper, Switch, Title, useMantineTheme } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import EditImage from "./EditImage";
import { Photo } from "@spiel-wedding/types/Photo";
import {
  showFailureNotification,
  showSuccessNotification,
} from "@spiel-wedding/components/notifications/notifications";
import Image from "next/image";
import classes from "../gallery.module.css";
import { useSWRConfig } from "swr";
import { GALLERY_SWR_KEY, updatePhoto } from "@spiel-wedding/hooks/gallery";
import { supabase } from "@spiel-wedding/database/database";

interface Props {
  image: Photo;
  displayAdminView: boolean;
}

const GalleryImage = ({ image, displayAdminView }: Props): JSX.Element => {
  const theme = useMantineTheme();
  const { mutate } = useSWRConfig();
  const { data } = supabase.storage
    .from("gallery")
    .getPublicUrl(image.imagePath);

  const toggleVisibility = async (isVisible: boolean) => {
    const photo = await updatePhoto(image.id, { isVisible });
    const successMessage = isVisible ? "public" : "hidden";

    if (photo) {
      showSuccessNotification(`Image visibility is now  ${successMessage}`);
      await mutate(GALLERY_SWR_KEY);
    } else {
      showFailureNotification();
    }
  };

  return (
    <Paper bg="none" radius="md" className={classes.card}>
      <Image
        src={data.publicUrl}
        alt={image.caption ?? image.id}
        className={classes.cardImage}
        fill
        sizes="(max-width: 768px) 33vw"
        style={{ objectFit: "contain", zIndex: 0 }}
      />

      <Flex
        wrap="wrap"
        w="100%"
        className={classes.adminControlsContainer}
        m="md"
      >
        {displayAdminView && (
          <Switch
            checked={image.isVisible}
            onChange={(event): void => {
              toggleVisibility(event.currentTarget.checked);
            }}
            color="teal"
            size="md"
            mt="md"
            mr="md"
            thumbIcon={
              image.isVisible ? (
                <IconCheck
                  size="0.8rem"
                  color={theme.colors.teal[6]}
                  stroke={3}
                />
              ) : (
                <IconX size="0.8rem" color={theme.colors.red[6]} stroke={3} />
              )
            }
          />
        )}
        <Title order={2} className={classes.title}>
          {image.caption}
        </Title>
        {displayAdminView && <EditImage image={image} />}
      </Flex>
    </Paper>
  );
};

export default GalleryImage;