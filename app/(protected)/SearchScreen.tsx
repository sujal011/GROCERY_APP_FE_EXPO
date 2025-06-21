import { View, TextInput, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Keyboard } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Fonts } from '@/utils/Constants'
import Feather from '@expo/vector-icons/Feather'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { RFValue } from 'react-native-responsive-fontsize'
import CustomText from '@/components/ui/CustomText'
import { getProductsBySearch } from '@/services/productService'
import ProductList from '@/components/Products/ProductList'
import { withCart } from '@/components/cart/WithCart'

const suggestionItems = [
  'Apple', 'Milk', 'Chips', 'Pooja thali', 'Coke', 'Banana', 'Bread', 'Rice', 'Sugar', 'Salt'
]

const SearchScreen = () => {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(true)
  const inputRef = useRef(null)

  const handleSearch = async (searchText?: string) => {
    const searchQuery = typeof searchText === 'string' ? searchText : query
    if (!searchQuery.trim()) return
    setLoading(true)
    setShowSuggestions(false)
    try {
      const data = await getProductsBySearch(searchQuery)
      setResults(data)
    } catch (e) {
      setResults([])
    } finally {
      setLoading(false)
      Keyboard.dismiss()
    }
  }

  const renderSuggestion = ({ item }: { item: string }) => (
    <TouchableOpacity style={styles.suggestionItem} onPress={() => { setQuery(item); handleSearch(item) }}>
      <Feather name="search" size={RFValue(16)} color={Colors.text} style={{ marginRight: 8 }} />
      <CustomText fontFamily={Fonts.Medium} fontSize={15}>{item}</CustomText>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.searchBarContainer}>
        <Feather name="search" size={RFValue(20)} color={Colors.text} />
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholderTextColor="black"
          placeholder="Search for products..."
          value={query}
          onChangeText={text => { setQuery(text); setShowSuggestions(true); }}
          onSubmitEditing={() => handleSearch()}
          autoFocus
          returnKeyType="search"
        />
        <TouchableOpacity onPress={() => handleSearch()}>
          <FontAwesome name="microphone" size={RFValue(20)} color={Colors.text} />
        </TouchableOpacity>
      </View>
      {showSuggestions && !loading && !results.length && (
        <FlatList
          data={suggestionItems.filter(item => item.toLowerCase().includes(query.toLowerCase()))}
          renderItem={renderSuggestion}
          keyExtractor={item => item}
          style={styles.suggestionList}
        />
      )}
      {loading && <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 30 }} />}
      {!loading && results.length > 0 && (
        <ProductList data={results} width='100%'/>
      )}
      {!loading && !results.length && !showSuggestions && (
        <CustomText style={{ textAlign: 'center', marginTop: 40, color: Colors.disabled }}>No products found.</CustomText>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  searchBarContainer: {
    backgroundColor: '#F3F4F7',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.6,
    borderColor: Colors.border,
    marginTop: 15,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    height: 50,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    fontFamily: Fonts.Medium,
    fontSize: RFValue(15),
    marginLeft: 10,
    color: "#000",
  },
  suggestionList: {
    marginHorizontal: 10,
    marginTop: 5,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderColor: Colors.border,
    backgroundColor: '#fff',
  },
})

export default withCart(SearchScreen)