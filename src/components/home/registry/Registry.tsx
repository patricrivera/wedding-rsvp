"use client";
import { Card, Text, Image } from "@mantine/core";
import { SectionContainer, SectionTitle } from "@spiel-wedding/common";

const Registry = (): JSX.Element => {
  return (
    <SectionContainer>
      <SectionTitle title="Registry" id="registry" />
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text mb="sm">
          We are so grateful to have you share in our special day. Your presence is our
          gift!
        </Text>
        <Text mb="sm">
          We&apos;re lucky to already have a home full of everything we need. If you wish
          to contribute beyond your attendance, we will be accepting contributions to our
          honeymoon and first home fund at our reception following the ceremony.
        </Text>
        <Text>Thanks for visiting and we can&apos;t wait to see you on our big day!</Text>
        <Image
          src="/assets/images/The-Spielbergers.webp"
          alt="The Spielbergers family portrait"
          height={250}
          fit="contain"
          radius="xl"
        />
      </Card>
    </SectionContainer>
  );
};

export default Registry;