package com.jay.springbootdemo.dao;

import com.jay.springbootdemo.model.Ingredient;
import org.springframework.stereotype.Repository;

public interface IngredientRepository {
    Iterable<Ingredient> findAll();

    Ingredient findOne(String id);

    Ingredient save(Ingredient ingredient);
}
