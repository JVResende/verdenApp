import React, { useContext, useState } from "react";
import { Image, NativeBaseProvider, ScrollView, VStack } from "native-base";
import { useProtectedPage } from "../../hooks/useProtectedPage";
import calculationImage from "../../../assets/calculationImage.png";
import { Dimensions } from 'react-native';
import { StepSelect } from "../../components/stepSelect";
import { BASE_URL, dataMonth } from "../../constants";
import { useRequestData } from "../../hooks/useRequestData";
import { StepSelectId } from "../../components/stepSelectId";
import { StepNumberInput } from "../../components/stepNumberInput";
import { useNavigation } from "@react-navigation/native";
import { GlobalStateContext } from "../../global/globalStateContext";

export function ExpressCalculationSteps() {

    useProtectedPage()

    const navigation = useNavigation()

    const windowHeight = Dimensions.get('window').height

    const { companyCnpj, calculationType, setStoredCalculations, companies } = useContext(GlobalStateContext)

    const [step, setStep] = useState('1')
    const [calculationYear, setCalculationYear] = useState("")
    const [month, setMonth] = useState("")
    const [modality, setModality] = useState({
        name: '',
        id: ''
    })
    const [categoryId, setCategoryId] = useState('')
    const [subCategoryId, setSubCategoryId] = useState('')
    const [fabricationYear, setFabricationYear] = useState("")
    const [numberOfVehicles, setNumberOfVehicles] = useState("")
    const [fuel, setFuel] = useState({
        id: ''
    })
    const [mileage, setMileage] = useState('')
    const [mileagePerLiter, setMileagePerLiter] = useState('')

    const [listAllYear] = useRequestData(`${BASE_URL}/calculation-year`)
    const [listModality] = useRequestData(`${BASE_URL}/modalities`)
    const [listCategory] = useRequestData(`${BASE_URL}/modalities/${modality.id}/categories/launch-year/${calculationYear}`, modality.id)
    const [listSubCategory] = useRequestData(`${BASE_URL}/categories/${categoryId}/subcategories`, categoryId)
    const [listFabricationYear] = useRequestData(`${BASE_URL}/categories/${categoryId}/subcategories/${subCategoryId}/years`, subCategoryId)
    const [listFuel] = useRequestData(`${BASE_URL}/categories/${categoryId}/subcategories/${subCategoryId}/fuels`, subCategoryId)

    let companyId
    companies.map(item => {
        if (item.cnpj === companyCnpj) {
            companyId = item.id
        }
    })

    let categoryName
    listCategory?.map(item => {
        if (item.id === categoryId) {
            categoryName = item.name
        }
    })

    let subCategoryName
    listSubCategory?.map(item => {
        if (item.id === subCategoryId) {
            subCategoryName = item.name
        }
    })

    const handleAddToTable = () => {
        setStoredCalculations(arr => [
            ...arr,
            {
                calculation_type: calculationType,
                company_cnpj: companyCnpj,
                company_id: companyId,
                calculation_year: calculationYear,
                month: month,
                category: {
                    id: categoryId,
                    name: categoryName,
                },
                subcategory: {
                    id: subCategoryId,
                    name: subCategoryName,
                },
                fuel: {
                    id: fuel.id,
                    name: fuel.name,
                    measure: 'litro',
                },
                modality: {
                    id: modality.id,
                    name: modality.name,
                },
                distance: mileage.replaceAll(',', '.'),
                liter: mileagePerLiter.replaceAll(',', '.'),
                vehicles: numberOfVehicles,
                year: fabricationYear,
            },
        ])
        navigation.navigate("storedExpressCalculations")
    }

    return (
        <NativeBaseProvider>
            <ScrollView>
                <VStack
                    flex={1}
                    safeArea
                    px={8}
                    h={windowHeight * 0.8}
                >
                    <Image
                        source={calculationImage}
                        size={96}
                        resizeMode="contain"
                        alt="expressImage"
                        alignSelf="center"
                        my={-12}
                    />
                    {step === "1" ?
                        (<StepSelect
                            text={"Selecione o ano desejado para realizar o cálculo das emissões. É importante ressaltar que o ano selecionado será utilizado como referência para todos os cálculos realizados neste processo."}
                            title={"Ano do cálculo:"}
                            placeholder={"Selecione o ano do cálculo"}
                            value={calculationYear}
                            setValue={setCalculationYear}
                            data={listAllYear}
                            onPressStep={() => setStep('2')}
                        />)
                        : null}
                    {step === "2" ?
                        <StepSelect
                            text={"Agora selecione o mês que deseja realizar o cálculo de suas emissõe. Atenção, o mês selecionado será utilizado como referência para todos os cálculos realizados neste processo."}
                            title={"Mês da apuração:"}
                            placeholder={"Selecione o mês da apuração"}
                            value={month}
                            setValue={setMonth}
                            data={dataMonth}
                            onPressStep={() => setStep('3')}
                            onPressStepBack={() => setStep('1')}
                            backButton={true}
                        />
                        : null}
                    {step === "3" ?
                        <StepSelectId
                            text={"Selecione a modalidade de transporte do seu veículo."}
                            title={"Modalidade de transporte:"}
                            placeholder={"Selecione a modalidade de transporte"}
                            value={modality}
                            setValue={setModality}
                            data={listModality}
                            onPressStep={() => setStep('4')}
                            onPressStepBack={() => setStep('2')}
                            backButton={true}
                        />
                        : null}
                    {step === "4" ?
                        <StepSelectId
                            text={"A categoria refere-se a uma classificação que agrupa os veículos de acordo com suas características e finalidades."}
                            title={"Categoria (Tipo do veículo):"}
                            placeholder={"Selecione uma categoria"}
                            value={categoryId}
                            setValue={setCategoryId}
                            data={listCategory}
                            onPressStep={() => setStep('5')}
                            onPressStepBack={() => setStep('3')}
                            backButton={true}
                        />
                        : null}
                    {step === "5" ?
                        <StepSelectId
                            text={"Uma subcategoria refere-se à classificação dos motores de acordo com suas características específicas e princípios de funcionamento."}
                            title={"Subcategoria (Tipo do motor):"}
                            placeholder={"Selecione uma subcategoria"}
                            value={subCategoryId}
                            setValue={setSubCategoryId}
                            data={listSubCategory}
                            onPressStep={() => setStep('6')}
                            onPressStepBack={() => setStep('4')}
                            backButton={true}
                        />
                        : null}
                    {step === "6" ?
                        <StepSelect
                            text={"Selecione o ano de fabricação do seu veículo na lista abaixo."}
                            title={"Ano de fabricação do veículo:"}
                            placeholder={"Selecione o ano de fabricação"}
                            value={fabricationYear}
                            setValue={setFabricationYear}
                            data={listFabricationYear}
                            onPressStep={() => setStep('7')}
                            onPressStepBack={() => setStep('5')}
                            backButton={true}
                        />
                        : null}
                    {step === "7" ?
                        <StepNumberInput
                            text={"Indique a quantidade de veículos para o veículo que foi informado nas etapas anteriores. Nosso sistema levará em consideração essa quantidade ao realizar os cálculos."}
                            title={"Quantidade de veículos:"}
                            placeholder={"Digite a quantidade de veículos"}
                            value={numberOfVehicles}
                            setValue={setNumberOfVehicles}
                            onPressStep={() => setStep('8')}
                            onPressStepBack={() => setStep('6')}
                            backButton={true}
                        />
                        : null}
                    {step === "8" ?
                        <StepSelectId
                            text={"Informe o tipo de combustível utilizado pelo seu veículo informado nas etapas anteriores. O verden levará em consideração essa informação ao realizar os cálculos."}
                            title={"Combustível:"}
                            placeholder={"Selecione o combustível"}
                            value={fuel}
                            setValue={setFuel}
                            data={listFuel}
                            onPressStep={() => setStep('9')}
                            onPressStepBack={() => setStep('7')}
                            backButton={true}
                        />
                        : null}
                    {step === "9" ?
                        <StepNumberInput
                            text={"Informe a quilometragem total mensal realizada pelo seu veículo de passageiros. Exemplo: 200 km, 500 km..."}
                            title={"Quilometragem total mensal:"}
                            placeholder={"Digite a quilometragem total"}
                            value={mileage}
                            setValue={setMileage}
                            onPressStep={() => setStep('10')}
                            onPressStepBack={() => setStep('8')}
                            backButton={true}
                        />
                        : null}
                    {step === "10" ?
                        <StepNumberInput
                            text={"Por fim, informe a quilometragem por litro de combustível que o seu veículo faz. Essa informação é muito importante para o verden realizar o cálculo das emissões veículares. Exemplo: 10,4 km/l."}
                            title={"Quilometragem por litro rodado:"}
                            placeholder={"Digite a quilometragem por litro rodado"}
                            value={mileagePerLiter}
                            setValue={setMileagePerLiter}
                            onPressStep={handleAddToTable}
                            onPressStepBack={() => setStep('9')}
                            backButton={true}
                            mileageInput={true}
                        />
                        : null}
                </VStack>
            </ScrollView>

        </NativeBaseProvider>
    );
}