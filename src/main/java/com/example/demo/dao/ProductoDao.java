package com.example.demo.dao;


import com.example.demo.models.Producto;
import com.example.demo.models.Usuario;

import java.util.List;


public interface ProductoDao {
    List<Producto> getProductos();
    void eliminar(Long id);
    void registrar(Producto producto);
    void actualizar(Producto producto,Long id);
}
