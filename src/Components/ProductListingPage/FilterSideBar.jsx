import { useProduct } from "../../Context/ProductContext"
import "./FilterSideBar.css";

export const FilterSideBar = () => {
    const {state,dispatch} = useProduct()
    const getBrands = (products) => {
        const allBrandNamesWithDuplicates = products.map(product => product.brandName)
        return allBrandNamesWithDuplicates.filter((brandname,index) => (allBrandNamesWithDuplicates.indexOf(brandname) === index)).sort()
    }
    return (
        <div className = "sidebar-wrapper">
            <div className = "sidebar__filters">
            <h4 className = "rm">FILTERS</h4>
                <div>
                    <input
                    type="checkbox"
                    name="in_stock_only"
                    className = "filter-margin"
                    checked = {state.otherFilter.in_stock}
                    onChange = {() => (dispatch({type : "OTHER_FILTER", payload:"in_stock"}))}
                    />
                    <label htmlFor="in_stock_only">In Stock Only</label>
                </div>
                <div>
                <label htmlFor="price">Price Range : 0 to 1000</label>
                <br/>
                <input
                    type="range"
                    min="0"
                    max="1000"
                    step="100"
                    value = {state.otherFilter.ranger_value}
                    className = "filter-margin"
                    onChange = {() => {}}
                />
                <h4 className = "rm">BRANDS</h4>
                {
                    getBrands(state.products).map((item,index) => {
                        return <div key ={index}>
                        <input
                        type="checkbox"
                        name={item}
                        className = "filter-margin"
                        checked = {state.brandFilter[item]}
                        onChange = {() => (dispatch({type:"FILTER_BY_BRAND",payload:item}))}
                        />
                        <label htmlFor={item}>{item}</label>
                    </div>
                    })
                }
                
                </div>
            </div>
        </div>
    )
}