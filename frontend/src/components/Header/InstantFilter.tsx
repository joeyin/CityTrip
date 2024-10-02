import React from "react";
import { StandaloneSearchBox } from "@react-google-maps/api";
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  NavbarItem,
  useDisclosure,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { AdvancedInput, AdvancedSelect, Button, Modal } from "@components";
import { IconFilter, IconLocation } from "@images/icons";
import { Device } from "@/constants";
import { SelectItem } from "@nextui-org/react";

const InstantFilter = () => {
  const t = useTranslations();
  const disclosure = useDisclosure();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <NavbarItem className="px-0 md:hidden">
        <Button
          shadow="none"
          color="primary"
          className="h-full w-[var(--navbar-height)] text-lg border-r-1 text-gray-500 border-gray-150"
          radius="none"
          isIconOnly
          variant="transparent"
          onClick={disclosure.onOpen}
        >
          <i className="fa-solid fa-magnifying-glass" />
        </Button>
      </NavbarItem>
      <Modal
        backdrop="blur"
        size="sm"
        variant="bordered"
        radius="sm"
        disclosure={disclosure}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{t("instant-filter")}</ModalHeader>
              <form onSubmit={handleSubmit}>
                <ModalBody>
                  <div className="w-full">
                    <StandaloneSearchBox
                    // onLoad={onSearchBoxLoad}
                    // onPlacesChanged={onPlacesChanged}
                    >
                      <AdvancedInput
                        name="location"
                        color="default"
                        radius="md"
                        icon={<IconLocation />}
                        label={t("location")}
                        placeholder={t("search-location")}
                        // value={place || ""}
                        isClearable
                        // onChange={onChange}
                        // onClear={() => setPlace("")}
                        onKeyDown={() => {}}
                      />
                    </StandaloneSearchBox>
                  </div>
                  <AdvancedSelect
                    multiple
                    name="filter"
                    fullWidth
                    radius="md"
                    icon={<IconFilter />}
                    label={t("filter")}
                    selectionMode="multiple"
                    // onChange={e => setFilter(e.target.value.split(","))}
                    // defaultSelectedKeys={filter}
                  >
                    {Object.keys(Device).map((item) => (
                      <SelectItem key={Device[item as keyof typeof Device]}>
                        {t(`devices.${Device[item as keyof typeof Device]}`)}
                      </SelectItem>
                    ))}
                  </AdvancedSelect>
                </ModalBody>
                <ModalFooter className="gap-5">
                  <Button
                    variant="bordered"
                    color="danger"
                    radius="md"
                    size="lg"
                    onPress={onClose}
                  >
                    {t("cancel")}
                  </Button>
                  <Button type="submit" color="primary" radius="md" size="lg">
                    {t("search")}
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default React.memo(InstantFilter);
