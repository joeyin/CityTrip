import React from "react";
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  NavbarItem,
  useDisclosure,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { AdvancedSelect, Button, Modal } from "@components";
import { IconFilter } from "@images/icons";
import { Facility } from "@/constants";
import { SelectItem } from "@nextui-org/react";
import { FormBody } from "@/providers/AppProvider";

export interface InstantFilterProps {
  onSubmit?: (props: FormBody) => void;
  queryParameters?: FormBody;
}

const InstantFilter = ({ onSubmit, queryParameters }: InstantFilterProps) => {
  const t = useTranslations();
  const disclosure = useDisclosure();

  const [facility, setFacility] = React.useState<string[]>(
    queryParameters?.facility || [],
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({
        facility,
        timestamp: new Date().getTime(),
      });
    }
    disclosure.onClose();
  };

  React.useEffect(() => {
    setFacility(queryParameters?.facility || []);
  }, [queryParameters?.facility]);

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

      {disclosure.isOpen && (
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
                    <AdvancedSelect
                      multiple
                      required
                      isRequired
                      name="filter"
                      fullWidth
                      radius="md"
                      icon={<IconFilter />}
                      label={t("filter")}
                      selectionMode="multiple"
                      onChange={(e) => {
                        const value = e.target.value;
                        setFacility(value ? value.split(",") : []);
                      }}
                      defaultSelectedKeys={facility}
                    >
                      {Object.keys(Facility).map((item) => (
                        <SelectItem
                          key={Facility[item as keyof typeof Facility]}
                        >
                          {t(
                            `facility.${Facility[item as keyof typeof Facility]}`,
                          )}
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
      )}
    </>
  );
};

export default React.memo(InstantFilter);
