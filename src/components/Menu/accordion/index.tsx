import { useState } from 'react';

import Header from './components/header';
import Content from './components/content';
import { IAttributeValue, IMenuCA } from '@/declarations/interfaces';
import { apis } from '@/libs/lazyimport';
import { reloadPagination, updateUI } from '@/store/UIStore';

type IAccordeon = {
  menu: IMenuCA
};
export default function AccordionSlide(props: IAccordeon) {
  const { alias } = props.menu;
  const [selectedAvId, setSelectedAvId] = useState(props.menu.selectedAvId);
  const [selectedAvName, setSelectedName] = useState(props.menu.selectedAvName);
  const [isOpen, setIsOpen] = useState(false);

  const onOpenClick = (e: React.MouseEvent) => {
    setIsOpen(!isOpen);

    const ca = apis.luxAPI.getAttributeByAlias(alias);
    const cameraName = apis.rtrAPI.mapCameraNameRTRToComponent(alias);
    const viewName = ca.viewName;
    updateUI({ viewName });
    apis.rtrAPI?.selectComponent(cameraName as number);
    apis?.assetsWorker?.preloadAssets(alias);

    e.preventDefault();
    e.stopPropagation();
  };

  const onViewMoreClick = () => {
    const newData = apis.luxAPI.reloadPagination(props.menu);
    return reloadPagination(newData);
  }

  const onSwatchClick = async (av: IAttributeValue, e: React.MouseEvent) => {
    try {
      const ca = apis.luxAPI.getAttributeByAlias(alias);
      await apis.setRecipe(
        [{ ca: { alias }, av: { id: av.id } }]
      );
      setSelectedAvId(av.id);
      setSelectedName(av.name);

      const token = apis.luxAPI.getToken();
      const viewName = ca.viewName;
      const configureImg = apis.luxAPI.getProductImg(viewName);
      const imgs = apis.luxAPI.mapConfigureImgs(viewName);
      const cameraName = apis.rtrAPI.mapCameraNameRTRToComponent(alias);

      updateUI({
        token,
        configureImg,
        imgs,
        viewName
      });

      apis.rtrAPI?.selectComponent(cameraName as number);
      apis.rtrAPI?.handleTokenChange(token);
      apis?.assetsWorker?.preloadAssets(alias);

      e.preventDefault();
      e.stopPropagation();
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <details
      open={isOpen}
      className='yr-accordion'
      onClick={onOpenClick}
    >
      <>
        <Header
          menu={props.menu}
          selectedAvId={selectedAvId}
          selectedAvName={selectedAvName}
          isOpen={isOpen}
          onOpenCallback={onOpenClick}
        />
        <Content
          menu={props.menu}
          isOpen={isOpen}
          selectedAvId={selectedAvId}
          selectedAvName={selectedAvName}
          onViewMoreClickCB={onViewMoreClick}
          onSwatchClickCB={onSwatchClick}
        />
      </>
    </details>
  );
};
