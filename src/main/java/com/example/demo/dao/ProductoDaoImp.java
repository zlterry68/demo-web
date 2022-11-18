package com.example.demo.dao;

import com.example.demo.models.Producto;
import com.example.demo.models.Usuario;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;


@Repository
@Transactional
public class ProductoDaoImp implements ProductoDao{
    @PersistenceContext
    EntityManager entityManager;

    @Override
    @Transactional
    public List<Producto> getProductos() {
        String query="FROM Producto";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void eliminar(Long id) {
        Producto producto = entityManager.find(Producto.class, id);
        entityManager.remove(producto);
    }

    @Override
    public void registrar(Producto producto) {
        entityManager.merge(producto);
    }

    @Override
    public void actualizar(Producto productoActualizado,Long id) {



        Producto productoParaActualizar=(Producto)entityManager.find(Producto.class,id);
        productoParaActualizar.setNombre(productoActualizado.getNombre());
        productoParaActualizar.setPrecio(productoActualizado.getPrecio());
        productoParaActualizar.setStock(productoActualizado.getStock());
        productoParaActualizar.setEstado(productoActualizado.getEstado());


       entityManager.merge(productoParaActualizar);
    }
}
