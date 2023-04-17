import React, { useState } from "react";
import { Carousel } from "@mantine/carousel";
import { onValue, ref } from "firebase/database";
import { listAll, ref as storageRef } from "firebase/storage";
import { database, storage } from "../../../../database/database";
import GalleryImage from "./GalleryImage";
import UploadImages from "./UploadImages";
import useAdminView from "../../../../hooks/adminView";
import SectionTitle from "../../../../components/common/SectionTitle";

export interface Captions {
  [key: string]: string;
}

const Gallery = (): JSX.Element => {
  const { isAdminViewEnabled } = useAdminView();
  const [captions, setCaptions] = useState<Captions>({});
  const [images, setAvailableImages] = useState<string[]>([]);
  const [enabledImages, setEnabledImges] = useState<string[]>([]);
  const captionsRef = ref(database, "admin/captions/");
  const enabledImagesRef = ref(database, "admin/enabledImages/");
  const imagesRef = storageRef(storage, "gallery/");

  React.useEffect(() => {
    listAll(imagesRef).then((result) => {
      setAvailableImages(result.items.map((item) => item.name));
    });
  }, []);

  React.useEffect(() => {
    onValue(captionsRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setCaptions(data);
      }
    });
  }, []);

  React.useEffect(() => {
    onValue(enabledImagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setEnabledImges(data);
      }
    });
  }, []);

  const availableImages = isAdminViewEnabled
    ? images
    : images.filter((image) => enabledImages.includes(image));

  const slides = availableImages.map((item) => (
    <Carousel.Slide key={item}>
      {
        <GalleryImage
          image={item}
          caption={captions[item.replace(".", "")] ?? ""}
          displayAdminView={isAdminViewEnabled}
          enabledImages={enabledImages}
        />
      }
    </Carousel.Slide>
  ));

  return (
    <>
      <SectionTitle title="Gallery" id="gallery" />
      {isAdminViewEnabled && <UploadImages />}

      <Carousel
        slideSize="50%"
        breakpoints={[{ maxWidth: "sm", slideSize: "100%", slideGap: 1 }]}
        slideGap="xl"
        pb="xl"
        align="start"
        withIndicators
        slidesToScroll={1}
      >
        {slides}
      </Carousel>
    </>
  );
};

export default Gallery;