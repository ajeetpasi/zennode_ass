import math

def apply_flat_10_discount(products, sub_total):
    discount_amount = 10
    print("Flat 10 Discount Applied: ", discount_amount)
    return discount_amount

def apply_bulk_5_discount(products, shortlisted_products, sub_total):
    discount_amount = 0
    
    for product in shortlisted_products:
        discount_amount += (product[1] * product[2]) * 0.05
    
    print("Bulk 5 Discount Applied: ", discount_amount)
    return discount_amount

def apply_bulk_10_discount(products, sub_total):
    discount_amount = sub_total * 0.1
    print("Bulk 10 Discount Applied: ", discount_amount)
    return discount_amount

def apply_tiered_50_discount(products, shortlisted_products, sub_total):
    discount_amount = 0
    
    for product in shortlisted_products:
        discount_amount += (product[1] * (product[2] - 15)) * 0.5
    
    print("Tiered 50 Discount Applied: ", discount_amount)
    return discount_amount

def generate_bill(products, is_gift_wrap):
    sub_total = 0
    sub_units = 0
    bulk_5_discounted_products = []
    tiered_50_discounted_products = []
    
    discounts = [False] * 4
    flag_tiered = False
    
    print("Product List:")
    print("Name Units Amount")
    
    for product in products:
        sub_total += product[1] * product[2]
        sub_units += product[2]
        
        if product[2] > 10:
            bulk_5_discounted_products.append(product)
            discounts[1] = True
        
        if product[2] > 15:
            tiered_50_discounted_products.append(product)
            flag_tiered = True
        
        print(product[0], product[2], product[1] * product[2])
    
    print("Subtotal: ", sub_total)
            
    if sub_units > 30 and flag_tiered:
        discounts[3] = True
    
    if sub_units > 20:
        discounts[2] = True
    
    if sub_total > 200:
        discounts[0] = True
        
    
    if discounts[0]:
        sub_total -= apply_flat_10_discount(products, sub_total)
    
    if discounts[1]:
        sub_total -= apply_bulk_5_discount(products, bulk_5_discounted_products, sub_total)
    
    if discounts[2]:
        sub_total -= apply_bulk_10_discount(products, sub_total)
    
    if discounts[3]:
        sub_total -= apply_tiered_50_discount(products, tiered_50_discounted_products, sub_total)
     
    shipping_fee =  10 * (math.ceil(sub_units / 10))
    sub_total += shipping_fee
    
    if is_gift_wrap:
        sub_total += sub_units
        print("Shipping and Gift Wrap Fee Applied: ", shipping_fee + sub_units)
    else:
        print("Shipping Fee Applied: ", shipping_fee + sub_units)
    
    print("Total Amount: ", sub_total)

    

generate_bill([["A",20,30],["B",40,11],["C",50,7]],True)