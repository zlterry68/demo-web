package com.example.demo.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="productos")
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    @Column(name="id")
    private Long id;
    @Getter
    @Setter
    @Column(name="nombre")
    private String nombre;
    @Getter
    @Setter
    @Column(name="precio")
    private double precio;
    @Getter
    @Setter
    @Column(name="stock")
    private int stock;
    @Getter
    @Setter
    @Column(name="estado")
    private String estado;



}
