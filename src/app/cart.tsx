import { useState } from "react"
import { Text, View, ScrollView, Alert, Linking } from "react-native"
import { useNavigation } from "expo-router"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import { ProductCartProps, useCartStore } from "@/stores/cart-store"

import { formatCurrency } from "@/utils/functions/format-currency"

import { Header } from "@/components/header"
import { Product } from "@/components/products"
import { Input } from "@/components/input"
import { Button } from "@/components/button"
import { Feather } from "@expo/vector-icons"
import { LinkButton } from "@/components/link-button"


const PHONE_NUMBER = "5533991339307"

export default function Cart(){
    const [address, setAddress] = useState("")
    const cartStore = useCartStore()
    const navigation = useNavigation()

    const total = formatCurrency(cartStore.products.reduce((total, product) => total + (product.price * product.quantity), 0))

    function handleProductRemove(product: ProductCartProps){
        Alert.alert("Remover", `Deseja remover ${product.title} do carrinho?!`, [
            {
                text: "Cancelar",
            },
            {
                text: "Remover",
                onPress: () => cartStore.remove(product.id),
            },
        ])
    }

    function handleOrder(){
        if(address.trim().length === 0){
            return Alert.alert("Pedido", "Informe os dados da entrega!")
        }
        const products = cartStore.products.map((product) => `\n ${product.quantity} ${product.title}`).join("")

        const message = `
        🍔 NOVO PEDIDO 🍔
        \n Endereço de entrega: ${address}
        \n Pedido do cliente:
        ${products}

        \n Valor total: ${total}
        `
        Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`)
        cartStore.clear()
        navigation.goBack()
    }

    return(
        <View className="flex-1 pt-8">
            <Header title="Seu Carrinho" />
            <KeyboardAwareScrollView>
                <ScrollView>
                    <View className="p-4 flex-1">
                        {cartStore.products.length > 0 ? (
                            <View className="border-b border-slate-700">
                                {cartStore.products.map((product) => (<Product key={product.id} data={product} onPress={() => handleProductRemove(product)} />))}
                            </View>
                        ) : (
                            <Text className="font-body text-slate-400 text-center my-8">
                                Seu carrinho está vazio!
                            </Text>
                        )}

                        <View className="flex-row gap-2 items-center mt-5 mb-4">
                            <Text className="text-white text-xl font-subtitle">Total:</Text>
                            <Text className="text-lime-400 text-2xl font-heading">{total}</Text>
                        </View>

                        <Input
                            placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento"
                            onChangeText={setAddress}
                            onSubmitEditing={handleOrder}
                            blurOnSubmit={true}
                            returnKeyType="send"    
                        />
                    </View>
                </ScrollView>
            </KeyboardAwareScrollView>

            <View className="p-5 gap-5">
                <Button className="p-4 gap-5" onPress={handleOrder}>
                    <Button.Text>Enviar Pedido</Button.Text>
                    <Button.Icon><Feather name="arrow-right-circle" size={20} /></Button.Icon>
                </Button>

                <LinkButton title="Voltar ao cardárpio" href="/" />
            </View>
        </View>
    )
}