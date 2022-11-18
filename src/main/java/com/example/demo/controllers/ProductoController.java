package com.example.demo.controllers;

import com.example.demo.dao.ProductoDao;
import com.example.demo.models.Producto;
import com.example.demo.models.Usuario;
import com.example.demo.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductoController {
    @Autowired
    private ProductoDao productoDao;

    @Autowired
    private JWTUtil jwtUtil;


    @RequestMapping(value="api/productos",method = RequestMethod.GET)
    public List<Producto> getProductos(@RequestHeader(value="Authorization") String token){
        if(!validarToken(token)){
            return null;
        }
        return productoDao.getProductos();
    }
    @RequestMapping(value = "api/productos/{id}", method = RequestMethod.DELETE)
    public void eliminar(@RequestHeader(value = "Authorization") String token, @PathVariable Long id) {
        if (!validarToken(token)) {
            return;
        }

        productoDao.eliminar(id);
    }

    private boolean validarToken(String token) {
        String productoId = jwtUtil.getKey(token);
        return productoId != null;

    }

    @RequestMapping(value = "api/productos", method = RequestMethod.POST)
    public void registrarProductos( @RequestBody Producto producto) {

        productoDao.registrar(producto);
    }

    @RequestMapping(value = "api/producto_update/{id}", method = RequestMethod.PUT)
    public void actualizarProducto(@PathVariable Long id,@RequestBody Producto producto) {

        productoDao.actualizar(producto,id);
    }
}
