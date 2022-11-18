package com.example.demo.controllers;

import com.example.demo.dao.MailDao;
import com.example.demo.dao.ProductoDao;
import com.example.demo.dao.UsuarioDao;
import com.example.demo.models.Mail;
import com.example.demo.models.Producto;
import com.example.demo.models.Usuario;
import com.example.demo.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

@RestController
public class UsuarioController {

    @Autowired
    private UsuarioDao usuarioDao;

    @Autowired
    private MailDao mailDao;

    @Autowired
    private JWTUtil jwtUtil;

    @RequestMapping(value = "api/usuarios/{id}", method = RequestMethod.GET)
    public Usuario getUsuario(@PathVariable Long id) {
        Usuario usuario = new Usuario(id, "pepe", "tambo", "aa@gm.cim0", "zzzz");
        return usuario;
    }

    @RequestMapping(value = "api/usuarios", method = RequestMethod.GET)
    public List<Usuario> getUsuarios(@RequestHeader(value = "Authorization") String token) {
        if (!validarToken(token)) {
            return null;
        }


        return usuarioDao.getUsuarios();


    }




    @RequestMapping(value = "api/usuarios/{id}", method = RequestMethod.DELETE)
    public void eliminar(@RequestHeader(value = "Authorization") String token, @PathVariable Long id) {
        if (!validarToken(token)) {
            return;
        }

        usuarioDao.eliminar(id);
    }

    private boolean validarToken(String token) {
        String usuarioId = jwtUtil.getKey(token);
        return usuarioId != null;

    }

    @RequestMapping(value = "api/usuarios", method = RequestMethod.POST)
    public void registrarUsuarios(@RequestBody Usuario usuario) {
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1, 1024, 1, usuario.getPassword());
        usuario.setPassword(hash);
        usuarioDao.registrar(usuario);
    }

    @RequestMapping(value = "api/mail", method = RequestMethod.POST)
    public void enviarCorreo(@RequestBody Mail mail) {
        mailDao.sendEmail(mail.getTo(),mail.getSubject(),mail.getContent());


    }

    @RequestMapping(value = "api/usuarioContra", method = RequestMethod.POST)
    public String obtenerArgon(@RequestBody Usuario usuario) {
        String passwordHashed = usuario.getNombre();
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        if (argon2.verify(passwordHashed, usuario.getPassword())) {
            return "true";
        }
        return "false";
    }

    @RequestMapping(value = "api/mostrarUsuario", method = RequestMethod.POST)
    public Usuario mostrar(@RequestBody Usuario usuario){
        Usuario usu=usuarioDao.obtenerUsuarioPorCredenciales(usuario);
        return usu;
    }
    @RequestMapping(value = "api/modoficarUsuario", method = RequestMethod.POST)
    public void modificar(@RequestBody Usuario usuario){
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1, 1024, 1, usuario.getPassword());
        usuario.setPassword(hash);
        usuarioDao.actualizar(usuario);
    }
}
