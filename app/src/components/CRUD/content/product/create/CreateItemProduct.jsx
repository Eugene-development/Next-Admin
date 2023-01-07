import { useAuth } from '@/hooks/auth'
import { useQuery, useReactiveVar, useMutation } from '@apollo/client'
import { ALL_PRODUCT, CREATE_PRODUCT } from '@/apollo/query/product'
import { ALL_CATEGORY, ONE_CATEGORY } from '@/apollo/query/category'
import { is_visible_create_product } from '@/apollo/stores/visible'
import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { sortBy, values } from "lodash"
import { useSlug } from "@/hooks/slug";

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useImage } from '@/hooks/image'


const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";


const CreateItemProduct = () => {
    const { user } = useAuth({ middleware: 'guest' })
    const key = user.key

    const visibleForm = useReactiveVar(is_visible_create_product)
    const { data } = useQuery(ALL_CATEGORY, {variables: { key }})
    const [category, setCategory] = useState([])
    const [units, setUnits] = useState(["шт.", "м.п.", "кг"])
    const [selectedUnit, setSelectedUnit] = useState([])
    useEffect(() => {
        if (data) {
            const sortedCategory = sortBy(data.category, ['value']);
            setCategory(sortedCategory);
        }
    }, [data]);

    const [selectedParent, setSelectedParent] = useState([]);
    const handleParentChange = (e) => setSelectedParent(e.target.value);
    const handleUnitChange = (e) => setSelectedUnit(e.target.value);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const { slugify } = useSlug();
    const handleAddProduct = (e) => {
        sendImage(cropData);
        e.preventDefault();
        if (name.trim().length && price.trim().length) {
            addProduct({
                variables: {
                key,
                value: name,
                slug: slugify(name.translit()),
                parentableType: 'category',
                parentableId: Number(selectedParent),
                createPrice: { key: "1", value: price },
                createUnit: { key: "1", value: selectedUnit }
            },
            });
            setName('');
            setPrice('');
            setSelectedParent([]);
            setSelectedUnit([]);
        }
    }
    const [addProduct] = useMutation(CREATE_PRODUCT, {
        refetchQueries: [
        { query: ONE_CATEGORY,
            variables: {key, id: selectedParent}}
        ],
    });
    // const [addProduct] = useMutation(CREATE_PRODUCT, {
    //     refetchQueries: [
    //     { query: ALL_PRODUCT,
    //         variables: { key }}
    //     ],
    // });
    const cancelButtonRef = useRef(null)

    const cropperRef = useRef(null);

//   const onCrop = () => {
//     const imageElement = cropperRef?.current;
//     const cropper = imageElement?.cropper;
//     console.log(cropper.getCroppedCanvas().toDataURL());
//   };

  const { sendImage } = useImage();
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());

    }
  };

  return (
    <>
        { data &&
            <Transition.Root show={visibleForm} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => is_visible_create_product(false)}>
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                        <div>
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                            <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                        </div>
                        <div className="mt-3 text-center sm:mt-5">
                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                            Добавление продукта
                            </Dialog.Title>
                            <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                При добавлении позиции будьте предельно внимательны к орфографии. При допущении ошибок вы можете далее исправить их, нажав на кнопку Обновить.
                            </p>
                            </div>
                        </div>
                        </div>
                        <form onSubmit={handleAddProduct} className="space-y-8 divide-y divide-gray-200" enctype="multipart/form-data">

                            <div className="py-2">
                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="parent" className="block text-sm font-medium text-gray-700">
                                        Принадлежит категории
                                    </label>
                                    <div className="mt-1">
                                        <select
                                            onChange={e => handleParentChange(e)}
                                            defaultValue={'DEFAULT'}
                                            id="parent"
                                            name="parent"
                                            autoComplete="parent-name"
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                                        >
                                            <option value="DEFAULT" disabled hidden>Выбрать</option>
                                            {category.map((item, key) => <option key={item.id} value={item.id}>{item.value}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className="sm:col-span-6">
                                    <label htmlFor="value" className="block text-sm font-medium text-gray-700">
                                        Наименование
                                    </label>
                                    <div className="mt-1">
                                        <input
                                        onChange={(e) => setName(e.target.value)}
                                        type="text"
                                        name="value"
                                        id="value"
                                        autoComplete="value"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-6">
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                        Цена
                                    </label>
                                    <div className="mt-1">
                                        <input
                                        onChange={(e) => setPrice(e.target.value)}
                                        type="text"
                                        name="price"
                                        id="price"
                                        autoComplete="price"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="parent" className="block text-sm font-medium text-gray-700">
                                        Единица измерения
                                    </label>
                                    <div className="mt-1">
                                        <select
                                            onChange={e => handleUnitChange(e)}
                                            defaultValue={'DEFAULT'}
                                            id="parent"
                                            name="parent"
                                            autoComplete="parent-name"
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                                        >
                                            <option value="DEFAULT" disabled hidden>Выбрать</option>
                                            {units.map((item, key) => <option key={key} value={item}>{item}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                                 <div>
      <div className="mt-8" style={{ width: "100%" }}>
        <input type="file" onChange={onChange} />
        <br />
        <br />
        <Cropper
          style={{ height: 400, width: "100%" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          src={image}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          onInitialized={(instance) => {
            setCropper(instance);
          }}
          guides={true}
        />
      </div>
      <div className="flex pt-4">
        <div className="mx-auto">
            <button type="button" onClick={getCropData} className=" inline-flex items-center rounded-md border border-transparent bg-green-100 px-6 py-3 text-base font-medium text-green-700 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">Обрезать</button>
        </div>

        <div
          className="p-0"
          style={{ width: "50%", float: "center", height: "300px" }}
        >
          <img style={{ width: "100%" }} src={cropData} />
        </div>
      </div>
    </div>

                            </div>

                            <div className="mt-8 sm:mt-10 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                <button
                                    type="submit"
                                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                                    onClick={() => is_visible_create_product(false)}
                                    >
                                    Добавить
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                                    onClick={() => is_visible_create_product(false)}
                                    ref={cancelButtonRef}
                                    >
                                    Отменить
                                </button>
                            </div>

                        </form>
                    </Dialog.Panel>
                    </Transition.Child>
                </div>
                </div>
            </Dialog>
            </Transition.Root>
        }
    </>
  )
}
export default CreateItemProduct
